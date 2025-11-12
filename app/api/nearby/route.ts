import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";
function haversine(lat1:number,lng1:number,lat2:number,lng2:number){ const toRad=(x:number)=>x*Math.PI/180; const R=6371; const dLat=toRad(lat2-lat1); const dLon=toRad(lng2-lng1); const a=Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2; return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); }
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "Helsingborg";
  const sort = searchParams.get("sort") || "standard";
  const lat = searchParams.get("lat"); const lng = searchParams.get("lng");
  const userLat = lat? Number(lat) : null; const userLng = lng? Number(lng) : null;
  const sb = supabaseServer();
  const { data: venues, error: vErr } = await sb.from("venues").select("id,name,city,lat,lng,open_now").eq("city", city).limit(80);
  if (vErr) return NextResponse.json({ error: vErr.message }, { status: 400 });
  const items: any[] = [];
  for (const v of venues || []) {
    const { data: price, error: pErr } = await sb.from("prices").select("id,price_sek,rating,photo_url,happy_hour,beers(name,style,abv)").eq("venue_id", v.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (pErr) return NextResponse.json({ error: pErr.message }, { status: 400 });
    const d = (userLat!=null && userLng!=null && v.lat!=null && v.lng!=null) ? haversine(userLat,userLng,v.lat,v.lng) : null;
    items.push({
      venue: { id: v.id, name: v.name, city: v.city, open_now: v.open_now, distance_km: d },
      deal: price ? { ...price, beer: price.beers ? { name: price.beers.name, style: price.beers.style, abv: price.beers.abv } : null } : null
    });
  }
  if (sort === "cheapest") items.sort((a,b)=> (a.deal?.price_sek ?? 1e9) - (b.deal?.price_sek ?? 1e9));
  else if (sort === "distance") items.sort((a,b)=> (a.venue.distance_km ?? 1e9) - (b.venue.distance_km ?? 1e9));
  return NextResponse.json({ items }, { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
}