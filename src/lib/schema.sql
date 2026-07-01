-- schema.sql
-- Run this in your Supabase SQL Editor (https://database.new)

-- 1. Create a Profiles table linked to Clerk user IDs
create table public.profiles (
  id text primary key, -- Stores Clerk user ID
  email text not null,
  first_name text,
  last_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Orders table
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id text references public.profiles(id) on delete set null,
  email text not null,
  total_price integer not null, -- stored in INR (e.g. 18999)
  currency text default 'INR' not null,
  status text default 'pending' not null, -- pending, paid, shipped, cancelled
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Order Items table
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_handle text not null,
  product_title text not null,
  price integer not null,
  quantity integer not null,
  size text
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Create Security Policies

-- Profiles Policies
create policy "Allow public read-only profiles" on public.profiles
  for select using (true);

create policy "Allow users to update their own profile" on public.profiles
  for update using ((select current_setting('request.jwt.claims', true)::json->>'sub') = id);

create policy "Allow users to insert their own profile" on public.profiles
  for insert with check ((select current_setting('request.jwt.claims', true)::json->>'sub') = id);

-- Orders Policies
create policy "Allow users to view their own orders" on public.orders
  for select using ((select current_setting('request.jwt.claims', true)::json->>'sub') = user_id);

create policy "Allow public/users to create orders" on public.orders
  for insert with check (true);

-- Order Items Policies
create policy "Allow users to view their own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = (select current_setting('request.jwt.claims', true)::json->>'sub')
    )
  );

create policy "Allow public/users to create order items" on public.order_items
  for insert with check (true);
