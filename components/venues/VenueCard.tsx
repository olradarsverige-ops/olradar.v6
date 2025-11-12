"use client";
import { useState } from "react";
import LogBeerModal from "../LogBeerModal";
export type Venue = { id:string; name:string; address?:string; city:string; open_now?:boolean; distance_km?:number|null; };
export type Deal = { id:string; price_sek:number; rating?:number|null; photo_url?:string|null; beer?:{name:string; style?:string|null; abv?:number|null}|null; happy_hour?:boolean|null };
export default function VenueCard({ venue, deal }:{ venue:Venue; deal:Deal|null }){
  const [open, setOpen] = useState(false);
  return (
    <div className="card p-3 flex items-center justify-between gap-3">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="font-semibold">{venue.name}</div>
          {deal?.happy_hour ? <span className="badge" title="Happy Hour">⚡ HH</span> : null}
          {venue.open_now ? <span className="badge" title="Öppet nu">🟢 Öppet</span> : <span className="badge" title="Stängt">🔴 Stängt</span>}
        </div>
        <div className="text-sm opacity-70">{venue.city} {typeof venue.distance_km==='number'?`• ${venue.distance_km.toFixed(1)} km`:""}</div>
        {deal && <div className="mt-1 text-sm">
          <span className="opacity-80">{deal.beer?.name ?? "Okänd öl"}</span> • <strong>{deal.price_sek} kr</strong>
          {deal.beer?.style && <span className="opacity-60">  ({deal.beer.style})</span>}
        </div>}
      </div>
      <button className="btn btn-amber" onClick={()=>setOpen(true)}>Logga öl</button>
      <LogBeerModal open={open} onClose={()=>setOpen(false)} presetVenue={{id:venue.id,name:venue.name,city:venue.city}} />
    </div>
  );
}