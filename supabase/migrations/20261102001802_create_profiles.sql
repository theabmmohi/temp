-- Profiles: one private row per auth user.

create type public.account_type as enum ('mentor', 'learner');

create table public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  name       text not null check (char_length(name) between 1 and 60),
  type       public.account_type not null,
  phone      text check (char_length(phone) <= 20),
  dob        date,
  address    text check (char_length(address) <= 300),
  note       text check (char_length(note) <= 500),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Each user can only see and write their own row.
create policy "profiles: read own"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

create policy "profiles: insert own"
  on public.profiles for insert to authenticated
  with check (id = (select auth.uid()));

create policy "profiles: update own"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- No delete grant: a profile is removed only when its auth user is deleted.
-- No update grant on id, type or created_at: the account type is set once at onboarding.
revoke all on public.profiles from anon, authenticated;
grant select, insert on public.profiles to authenticated;
grant update (name, phone, dob, address, note) on public.profiles to authenticated;
