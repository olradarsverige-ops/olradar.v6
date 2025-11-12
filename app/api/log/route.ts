import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";
export async function POST(req: Request) {
  const form = await req.formData();
  const beer_name = String(form.get("beer_name")||"");
  const beer_style = String(form.get("beer_style")||"");
  const price = Number(form.get("price")||0);
  const rating = Number(form.get("rating")||3);
  const venue_id = form.get("venue_id") ? String(form.get("venue_id")) : null;
  const venue_name = String(form.get("venue_name")||"");
  const venue_city = String(form.get("venue_city")||"");
  const file = form.get("photo") as File | null;
  if (!beer_name || !beer_style || !price || !(venue_id || venue_name)) { return NextResponse.json({ error: "Saknar fält" }, { status: 400 }); }
  const sb = supabaseServer();
  let vId = venue_id;
  if (!vId) {
    const { data: vNew, error: vErr } = await sb.from("venues").insert({ name: venue_name, city: venue_city || "" }).select("id").single();
    if (vErr) return NextResponse.json({ error: vErr.message }, { status: 400 });
    vId = vNew.id;
  }
  const { data: beer, error: bErr } = await sb.from("beers").upsert({ name: beer_name, style: beer_style }, { onConflict: "name" }).select("id").single();
  if (bErr) return NextResponse.json({ error: bErr.message }, { status: 400 });
  let photo_url: string | null = null;
  if (file) {
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "photos";
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const filename = `photos/${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`;
    const { error: upErr } = await sb.storage.from(bucket).upload(filename, bytes, { contentType: file.type || "image/jpeg", upsert: true });
    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 400 });
    const { data: pub } = sb.storage.from(bucket).getPublicUrl(filename);
    photo_url = pub.publicUrl;
  }
  const { error: pErr } = await sb.from("prices").insert({ venue_id: vId, beer_id: beer.id, price_original: price, currency: "SEK", price_sek: price, rating, photo_url, verified: false });
  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}