create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 160),
  email text not null check (char_length(email) <= 320 and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  whatsapp text check (whatsapp is null or char_length(whatsapp) <= 80),
  project_type text not null check (char_length(btrim(project_type)) between 1 and 120),
  budget text check (budget is null or char_length(budget) <= 160),
  message text not null check (char_length(btrim(message)) between 2 and 10000),
  status text not null default 'new' check (status in ('new', 'reviewed')),
  created_at timestamptz not null default now()
);

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);

create table if not exists public.inbox_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.contact_inquiries enable row level security;
alter table public.inbox_admins enable row level security;

revoke all on table public.contact_inquiries from anon, authenticated;
revoke all on table public.inbox_admins from anon, authenticated;
grant insert (name, email, whatsapp, project_type, budget, message)
  on table public.contact_inquiries to anon, authenticated;
grant select, delete on table public.contact_inquiries to authenticated;
grant update (status) on table public.contact_inquiries to authenticated;
grant select on table public.inbox_admins to authenticated;

create policy "Public can submit contact inquiries"
  on public.contact_inquiries for insert to anon, authenticated
  with check (status = 'new');

create policy "Portfolio admins can read contact inquiries"
  on public.contact_inquiries for select to authenticated
  using (exists (
    select 1 from public.inbox_admins
    where inbox_admins.user_id = (select auth.uid())
  ));

create policy "Portfolio admins can update inquiry status"
  on public.contact_inquiries for update to authenticated
  using (exists (
    select 1 from public.inbox_admins
    where inbox_admins.user_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.inbox_admins
    where inbox_admins.user_id = (select auth.uid())
  ));

create policy "Portfolio admins can delete contact inquiries"
  on public.contact_inquiries for delete to authenticated
  using (exists (
    select 1 from public.inbox_admins
    where inbox_admins.user_id = (select auth.uid())
  ));

create policy "Portfolio admins can read their own admin record"
  on public.inbox_admins for select to authenticated
  using (user_id = (select auth.uid()));

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function private.grant_portfolio_inbox_admin()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if lower(coalesce(new.email, '')) = 'sayedelghanam123@gmail.com' then
    insert into public.inbox_admins (user_id)
    values (new.id)
    on conflict (user_id) do nothing;
  end if;
  return new;
end;
$$;

revoke all on function private.grant_portfolio_inbox_admin() from public, anon, authenticated;

drop trigger if exists on_portfolio_inbox_admin_signup on auth.users;
create trigger on_portfolio_inbox_admin_signup
  after insert on auth.users
  for each row execute function private.grant_portfolio_inbox_admin();
