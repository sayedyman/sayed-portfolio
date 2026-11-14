# Supabase contact inbox

The portfolio contact form and private inbox use a dedicated Supabase project:

- Project: `sayed-portfolio`
- Project reference: `wvztpkziktdaxbmotxvn`
- Region: `eu-central-1`
- Monthly project creation quote: `$0`
- Admin email allowed by the database trigger: `sayedelghanam123@gmail.com`

The public form inserts only the submitted contact fields. Row Level Security keeps message reads, status changes, and deletes available only to the account created with the allowed admin email. The browser uses the publishable key; no secret or service-role key is needed by this app.

## Local setup

The repository's ignored `.env.local` is configured with this project's URL and publishable key. Keep the publishable key in `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`; never put a Supabase secret key in a `NEXT_PUBLIC_` variable.

If you need to recreate the local values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://wvztpkziktdaxbmotxvn.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<project publishable key>
```

## Auth redirect setup

In Supabase Dashboard, the **Site URL** is set to `https://sayedportfolio.online`. The allowed redirect URLs are:

- `http://localhost:3000/inquiries-admin`
- `https://sayedportfolio.online/inquiries-admin`
- `http://localhost:3000/inquiries-admin/reset-password`
- `https://sayedportfolio.online/inquiries-admin/reset-password`

The `/inquiries-admin` page signs in with an existing Supabase Auth email and password. The account `sayedelghanam123@gmail.com` already exists and has inbox access. Use **Forgot password?** on the sign-in page to request a recovery link, then set the new password on `/inquiries-admin/reset-password`. The dashboard itself does not send login links or create accounts. Other authenticated accounts cannot read, update, or delete inquiry rows.

## Schema

The database schema and access policies are tracked in `supabase/migrations/20261114155107_contact_inquiries.sql`.
