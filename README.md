# Ölradar v6 (Pro) – A/B + Venues + Logga öl + Närhet + HH + Notiser

Redo för GitHub → Vercel. Innehåller:
- Variant A/B (middleware + toggle)
- Venues-lista med sortering (Standard / Billigast / Närmast)
- Geolokation (frågar användaren om tillåtelse; om nekas, faller tillbaka utan avstånd)
- Happy Hour flagga (läser `prices.happy_hour` om kolumnen finns, annars false)
- "Deal Alert" notiser (client-side, kräver web notifications-permission)
- "Logga öl"-modal med ölstilar dropdown + foto-upload → Supabase Storage

## Env (Vercel)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_STORAGE_BUCKET=photos

## Antaget schema
venues(id text pk, name text, city text, lat double, lng double, open_now bool)
beers(id text pk, name text unique, style text, abv numeric)
prices(id text pk, venue_id fk, beer_id fk, price_original numeric, currency text default 'SEK', price_sek numeric, rating numeric, photo_url text, happy_hour bool, verified bool default false, created_at timestamptz default now())

> `happy_hour` är valfri – om den saknas returnerar API:false.

## Deploy
- Framework: Next.js
- Build command: `next build`
- Output: default (`.next`), krävs för middleware
- Inga path-alias. "use client" där det behövs.
