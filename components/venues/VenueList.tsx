"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import VenueCard, { Venue } from "./VenueCard";
import NotificationBell from "../notifs/NotificationBell";

type Item = { venue:Venue; deal:any|null };

function useGeo(){
  const [pos, setPos] = useState<{lat:number; lng:number} | null>(null);
  const askedRef = useRef(false);
  useEffect(()=>{
    if(typeof navigator !== 'undefined' && navigator.geolocation && !askedRef.current){
      askedRef.current = true;
      navigator.geolocation.getCurrentPosition(
        (p)=> setPos({ lat: p.coords.latitude, lng: p.coords.longitude }),
        (_)=> setPos(null),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 60_000 }
      );
    }
  },[]);
  return pos;
}

export default function VenueList(){
  const [city, setCity] = useState<string>("Helsingborg");
  const [sort, setSort] = useState<string>("standard");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const geo = useGeo();

  const load = useCallback(async () => {
    setLoading(true);
    const qs = new URLSearchParams({ city, sort: sort === "distance" && geo ? "distance" : sort });
    if (sort === "distance" && geo){ qs.set("lat", String(geo.lat)); qs.set("lng", String(geo.lng)); }
    const res = await fetch(`/api/nearby?${qs.toString()}`, { cache: "no-store" });
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }, [city, sort, geo]);

  useEffect(()=>{ load(); },[load]);
  useEffect(()=>{ const h=()=>load(); window.addEventListener("beer-logged", h as any); return ()=>window.removeEventListener("beer-logged", h as any);},[load]);

  const cities = ["Helsingborg","Stockholm","Göteborg","Malmö"]; // TODO: ersätt med /api/venues?distinct=city

  return (
    <section className="mt-6 space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <div className="label">Stad</div>
          <select className="select" value={city} onChange={(e)=>setCity(e.target.value)}>
            {cities.map(c=>(<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <div>
          <div className="label">Sortering</div>
          <select className="select" value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="standard">Standard</option>
            <option value="cheapest">Billigast</option>
            <option value="distance">Närmast</option>
          </select>
        </div>
      </div>

      <NotificationBell cityGetter={()=>city} />

      {loading && <div className="opacity-70">Laddar…</div>}

      <div className="space-y-3">
        {items.map((it,idx)=>(<VenueCard key={it.venue.id+idx} venue={it.venue} deal={it.deal} />))}
        {!loading && items.length===0 && <div className="opacity-70">Inga ställen hittades.</div>}
      </div>
    </section>
  );
}
