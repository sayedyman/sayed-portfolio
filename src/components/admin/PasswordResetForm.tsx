"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const inputClass = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-white/50";

export function PasswordResetForm() {
  const supabase = useMemo(() => createClient(), []);
  const [status, setStatus] = useState<"checking" | "ready" | "done" | "invalid">("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (active && event === "PASSWORD_RECOVERY" && session) setStatus("ready");
    });

    void supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      if (data.session) setStatus("ready");
      else {
        setStatus("invalid");
        if (sessionError) setError(sessionError.message);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  async function savePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Use a password with at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords do not match");
      return;
    }

    setIsSaving(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) setError(updateError.message);
      else {
        setPassword("");
        setConfirmPassword("");
        setStatus("done");
      }
    } catch {
      setError("Could not update the password. Request a new reset link and try again");
    } finally {
      setIsSaving(false);
    }
  }

  return <main className="grid min-h-screen place-items-center bg-[#111] px-5 text-white">
    <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl md:p-10">
      <div className="mb-8 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3">
        {status === "done" ? <CheckCircle2 size={22} /> : <KeyRound size={22} />}
      </div>
      <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/45">Sayed Elghanam</p>
      {status === "checking" && <><h1 className="mb-3 text-3xl font-medium">Checking reset link</h1><p className="text-sm text-white/55">Please wait...</p></>}
      {status === "ready" && <>
        <h1 className="mb-3 text-3xl font-medium">Set a new password</h1>
        <p className="mb-8 text-sm leading-6 text-white/55">Choose a password for your Supabase Auth account</p>
        <form onSubmit={savePassword} className="space-y-4">
          <label className="block space-y-2 text-sm text-white/75" htmlFor="new-password">New password
            <input id="new-password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} placeholder="At least 8 characters" />
          </label>
          <label className="block space-y-2 text-sm text-white/75" htmlFor="confirm-password">Confirm password
            <input id="confirm-password" type="password" autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className={inputClass} placeholder="Repeat the new password" />
          </label>
          <button disabled={isSaving} className="w-full rounded-xl bg-white px-4 py-3 font-medium text-black transition hover:bg-white/85 disabled:cursor-wait disabled:opacity-60">
            {isSaving ? "Saving password..." : "Save password"}
          </button>
        </form>
        {error && <p role="alert" className="mt-5 text-sm text-rose-300">{error}</p>}
      </>}
      {status === "done" && <>
        <h1 className="mb-3 text-3xl font-medium">Password updated</h1>
        <p className="mb-8 text-sm leading-6 text-white/55">You can now sign in to the contact inbox with your email and new password</p>
        <Link href="/inquiries-admin" className="inline-flex w-full justify-center rounded-xl bg-white px-4 py-3 font-medium text-black transition hover:bg-white/85">Continue to inbox</Link>
      </>}
      {status === "invalid" && <>
        <h1 className="mb-3 text-3xl font-medium">Reset link expired</h1>
        <p className="mb-8 text-sm leading-6 text-white/55">Request a fresh password reset link from the inbox sign-in page</p>
        {error && <p role="alert" className="mb-5 text-sm text-rose-300">{error}</p>}
        <Link href="/inquiries-admin" className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white"><ArrowLeft size={16} /> Back to sign in</Link>
      </>}
    </section>
  </main>;
}
