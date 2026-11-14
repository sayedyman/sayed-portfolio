"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { ArrowLeft, Check, ChevronDown, ExternalLink, Inbox, LogOut, Mail, RefreshCw, Search, Trash2 } from "lucide-react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  project_type: string;
  budget: string | null;
  message: string;
  status: "new" | "reviewed";
  created_at: string;
};

const inputClass = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-white/50";

export function InboxDashboard() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [checkingAccess, setCheckingAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isRequestingReset, setIsRequestingReset] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "new" | "reviewed">("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error: queryError } = await supabase
      .from("contact_inquiries")
      .select("id,name,email,whatsapp,project_type,budget,message,status,created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    if (queryError) setError(queryError.message);
    else setRows((data ?? []) as Inquiry[]);
    setLoading(false);
  }, [supabase]);

  const verifyAdmin = useCallback(async () => {
    const { data, error: accessError } = await supabase
      .from("inbox_admins")
      .select("user_id")
      .maybeSingle();
    const allowed = !accessError && Boolean(data);
    setIsAdmin(allowed);
    setCheckingAccess(false);
    if (allowed) void refresh();
  }, [supabase, refresh]);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setCheckingSession(false);
      if (data.user) {
        setCheckingAccess(true);
        void verifyAdmin();
      } else {
        setIsAdmin(false);
        setCheckingAccess(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setCheckingSession(false);
      if (session?.user) {
        setCheckingAccess(true);
        window.setTimeout(() => void verifyAdmin(), 0);
      } else {
        setIsAdmin(false);
        setCheckingAccess(false);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, [supabase, verifyAdmin]);

  const visibleRows = rows.filter((row) => {
    const matchesFilter = filter === "all" || row.status === filter;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [row.name, row.email, row.project_type, row.message].some((value) => value.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setIsSigningIn(true);
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (loginError) {
        setError(loginError.message === "Invalid login credentials" ? "Email or password is incorrect" : loginError.message);
      } else {
        setPassword("");
      }
    } catch {
      setError("Could not reach Supabase. Check your connection and try again");
    } finally {
      setIsSigningIn(false);
    }
  }

  async function requestPasswordReset() {
    setError("");
    setNotice("");
    if (!email.trim()) {
      setError("Enter your email address first");
      return;
    }
    setIsRequestingReset(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/inquiries-admin/reset-password`,
      });
      if (resetError) {
        setError(resetError.message.toLowerCase().includes("email rate limit exceeded")
          ? "Supabase reached its email sending limit. Wait a while before requesting another reset link"
          : resetError.message);
      }
      else setNotice("If this email has an account, a password reset link has been sent");
    } catch {
      setError("Could not reach Supabase. Check your connection and try again");
    } finally {
      setIsRequestingReset(false);
    }
  }

  async function updateStatus(row: Inquiry) {
    const nextStatus = row.status === "new" ? "reviewed" : "new";
    const { error: updateError } = await supabase.from("contact_inquiries").update({ status: nextStatus }).eq("id", row.id);
    if (updateError) setError(updateError.message);
    else {
      setRows((current) => current.map((item) => item.id === row.id ? { ...item, status: nextStatus } : item));
      setSelected((current) => current?.id === row.id ? { ...current, status: nextStatus } : current);
    }
  }

  async function deleteInquiry(row: Inquiry) {
    if (!window.confirm("Permanently delete this message?")) return;
    const { error: deleteError } = await supabase.from("contact_inquiries").delete().eq("id", row.id);
    if (deleteError) setError(deleteError.message);
    else {
      setRows((current) => current.filter((item) => item.id !== row.id));
      setSelected(null);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setRows([]);
    setSelected(null);
  }

  if (checkingSession) return <main className="grid min-h-screen place-items-center bg-[#111] text-white/70">Loading inbox...</main>;

  if (!user) {
    return <main className="grid min-h-screen place-items-center bg-[#111] px-5 text-white">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl md:p-10">
        <div className="mb-8 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3"><Inbox size={22} /></div>
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/45">Sayed Elghanam</p>
        <h1 className="mb-3 text-3xl font-medium">Contact inbox</h1>
        <p className="mb-8 text-sm leading-6 text-white/55">Sign in with the email and password registered in Supabase Auth</p>
        <form onSubmit={signIn} className="space-y-4">
          <label className="block space-y-2 text-sm text-white/75" htmlFor="admin-email">Email address
            <input id="admin-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} placeholder="you@example.com" />
          </label>
          <label className="block space-y-2 text-sm text-white/75" htmlFor="admin-password">Password
            <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} placeholder="Enter your password" />
          </label>
          <button type="button" onClick={() => void requestPasswordReset()} disabled={isRequestingReset} className="text-sm text-white/60 underline decoration-white/25 underline-offset-4 hover:text-white disabled:opacity-50">
            {isRequestingReset ? "Sending reset link..." : "Forgot password?"}
          </button>
          {notice && <p role="status" className="text-sm text-emerald-300">{notice}</p>}
          {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
          <button disabled={isSigningIn} className="w-full rounded-xl bg-white px-4 py-3 font-medium text-black transition hover:bg-white/85 disabled:cursor-wait disabled:opacity-60">
            {isSigningIn ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"><ArrowLeft size={16} /> Back to portfolio</Link>
      </section>
    </main>;
  }

  if (checkingAccess) return <main className="grid min-h-screen place-items-center bg-[#111] text-white/70">Checking inbox access...</main>;

  if (!isAdmin) return <main className="grid min-h-screen place-items-center bg-[#111] px-5 text-white">
    <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl md:p-10">
      <h1 className="text-2xl font-medium">This account has no inbox access</h1>
      <p className="mt-3 text-sm leading-6 text-white/55">Sign in with the portfolio administrator email to open contact messages</p>
      <button onClick={() => void signOut()} className="mt-7 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/75 hover:bg-white/5">Sign out</button>
    </section>
  </main>;

  const newCount = rows.filter((row) => row.status === "new").length;

  return <main className="min-h-screen bg-[#111] text-white">
    <header className="border-b border-white/10 px-5 py-5 md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3"><span className="rounded-xl border border-white/10 bg-white/5 p-2.5"><Inbox size={19} /></span><div><p className="text-xs uppercase tracking-[0.2em] text-white/45">Sayed Elghanam</p><h1 className="text-lg font-medium">Contact inbox</h1></div></div>
        <div className="flex items-center gap-3"><span className="hidden text-sm text-white/45 sm:block">{user.email}</span><button onClick={() => void signOut()} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 hover:bg-white/5"><LogOut size={15} /> Sign out</button></div>
      </div>
    </header>
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-10 md:py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-2 text-xs uppercase tracking-[0.22em] text-white/40">Incoming projects</p><h2 className="text-3xl font-medium md:text-4xl">Messages <span className="text-white/40">({rows.length})</span></h2><p className="mt-2 text-sm text-white/50">{newCount} new {newCount === 1 ? "message" : "messages"}</p></div>
        <button onClick={() => void refresh()} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh</button>
      </div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email or message" className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm outline-none focus:border-white/30" /></label>
        <div className="relative inline-flex">
          <select value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)} className="appearance-none rounded-xl border border-white/10 bg-[#191919] py-3 pl-4 pr-9 text-sm text-white/75 outline-none">
            <option value="all">All messages</option><option value="new">New</option><option value="reviewed">Reviewed</option>
          </select>
          <ChevronDown aria-hidden="true" size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70" />
        </div>
      </div>
      {error && <p role="alert" className="mb-4 rounded-xl border border-rose-300/20 bg-rose-300/5 p-4 text-sm text-rose-200">{error}</p>}
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
        {loading ? <p className="p-10 text-center text-sm text-white/45">Loading messages...</p> : visibleRows.length === 0 ? <div className="p-12 text-center"><Inbox className="mx-auto mb-4 text-white/25" size={30} /><p className="text-white/75">{rows.length ? "No messages match your search" : "No messages yet"}</p><p className="mt-2 text-sm text-white/40">New contact form submissions will appear here</p></div> :
          <div className="divide-y divide-white/[0.07]">{visibleRows.map((row) => <button key={row.id} onClick={() => setSelected(row)} className="flex w-full items-start gap-4 px-5 py-5 text-left transition hover:bg-white/[0.04] md:px-7">
            <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${row.status === "new" ? "bg-emerald-300" : "bg-transparent"}`} />
            <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-x-3 gap-y-1"><strong className="font-medium">{row.name}</strong><span className="text-sm text-white/45">{row.email}</span><span className="rounded-full bg-white/[0.07] px-2.5 py-1 text-[11px] text-white/55">{row.project_type}</span></span><span className="mt-2 block truncate text-sm text-white/55">{row.message}</span></span>
            <time className="hidden shrink-0 text-xs text-white/40 sm:block">{new Date(row.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
          </button>)}</div>}
      </section>
    </div>
    {selected && <div className="fixed inset-0 z-50 grid place-items-end bg-black/70 p-0 backdrop-blur-sm sm:place-items-center sm:p-5" onClick={() => setSelected(null)}>
      <article role="dialog" aria-modal="true" aria-label="Contact message" onClick={(event) => event.stopPropagation()} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#171717] p-6 shadow-2xl sm:rounded-3xl sm:p-9">
        <div className="mb-7 flex items-start justify-between gap-4"><div><p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">{new Date(selected.created_at).toLocaleString()}</p><h2 className="text-2xl font-medium">{selected.name}</h2><a href={`mailto:${encodeURIComponent(selected.email)}`} className="mt-1 inline-flex items-center gap-1 text-sm text-white/55 hover:text-white">{selected.email} <ExternalLink size={12} /></a></div><button onClick={() => setSelected(null)} className="rounded-lg px-3 py-1 text-white/50 hover:bg-white/5" aria-label="Close">✕</button></div>
        <dl className="mb-7 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-2"><div><dt className="mb-1 text-xs text-white/40">Project type</dt><dd className="text-sm">{selected.project_type}</dd></div>{selected.budget && <div><dt className="mb-1 text-xs text-white/40">Budget</dt><dd className="text-sm">{selected.budget}</dd></div>}{selected.whatsapp && <div><dt className="mb-1 text-xs text-white/40">WhatsApp</dt><dd dir="ltr" className="text-left text-sm">{selected.whatsapp}</dd></div>}</dl>
        <div className="mb-8"><p className="mb-3 text-xs uppercase tracking-[0.16em] text-white/40">Message</p><p className="whitespace-pre-wrap text-sm leading-7 text-white/75">{selected.message}</p></div>
        <div className="flex flex-wrap gap-2 border-t border-white/10 pt-5"><a href={`mailto:${encodeURIComponent(selected.email)}?subject=${encodeURIComponent(`Re: ${selected.project_type} inquiry`)}`} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black"><Mail size={16} /> Reply by email</a><button onClick={() => void updateStatus(selected)} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/75 hover:bg-white/5"><Check size={16} /> Mark {selected.status === "new" ? "reviewed" : "new"}</button><button onClick={() => void deleteInquiry(selected)} className="inline-flex items-center gap-2 rounded-xl border border-rose-300/20 px-4 py-2.5 text-sm text-rose-200 hover:bg-rose-300/5"><Trash2 size={16} /> Delete</button></div>
      </article>
    </div>}
  </main>;
}
