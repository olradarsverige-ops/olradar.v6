import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const city = searchParams.get("city") || "";
  const sb = supabaseServer();
  let query = sb.from("venues").select("id,name,city").limit(20);
  if (q) query = query.ilike("name", `%${q}%`);
  if (city) query = query.eq("city", city);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ items: data || [] }, { headers: { "Cache-Control": "no-store" } });
}