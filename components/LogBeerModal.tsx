"use client";
import { useEffect, useRef, useState } from "react";
import { BEER_STYLES } from "./ui/beer-styles";
type Venue = { id:string; name:string; city:string };
export default function LogBeerModal({ open, onClose, presetVenue }:{ open:boolean; onClose:()=>void; presetVenue?: Venue|null }){
  const ref = useRef<HTMLDivElement|null>(null);
  const [venue, setVenue] = useState<Venue|undefined>(presetVenue||undefined);
  const [venueQuery, setVenueQuery] = useState(""); const [venues, setVenues] = useState<Venue[]>([]);
  const [beerName, setBeerName] = useState(""); const [beerStyle, setBeerStyle] = useState(""); const [price, setPrice] = useState(""); const [rating, setRating] = useState(3);
  const [file, setFile] = useState<File|null>(null); const [saving, setSaving] = useState(false); const [msg, setMsg] = useState<string|undefined>();
  useEffect(()=>{ if(open){ setMsg(undefined);} },[open]);
  useEffect(()=>{ if(!venueQuery) return; const t = setTimeout(async()=>{ const res = await fetch(`/api/venues?city=&q=${encodeURIComponent(venueQuery)}`); const data = await res.json(); setVenues(data.items || []); }, 250); return ()=>clearTimeout(t); },[venueQuery]);
  useEffect(()=>{ const onKey=(e:KeyboardEvent)=>{ if(e.key==="Escape") onClose(); }; if(open) window.addEventListener("keydown", onKey); return ()=>window.removeEventListener("keydown", onKey);},[open,onClose]);
  if(!open) return null;
  const submit = async (e:React.FormEvent)=>{
    e.preventDefault(); if(!beerName || !beerStyle || !price) { setMsg("Fyll i alla fält"); return; }
    setSaving(true);
    const fd = new FormData();
    fd.append("beer_name", beerName);
    fd.append("beer_style", beerStyle);
    fd.append("price", price);
    fd.append("rating", String(rating));
    if(venue){ fd.append("venue_id", venue.id); fd.append("venue_name", venue.name); fd.append("venue_city", venue.city||""); }
    else { fd.append("venue_name", venueQuery); }
    if(file) fd.append("photo", file);
    const res = await fetch("/api/log", { method: "POST", body: fd });
    const data = await res.json();
    setSaving(false);
    if(!res.ok){ setMsg(data?.error||"Kunde inte spara"); return; }
    setMsg("Sparat! ✨");
    setTimeout(()=>{ onClose(); window.dispatchEvent(new CustomEvent("beer-logged")); }, 600);
  };
  return <div className="backdrop" onClick={(e)=>{ if(e.target===ref.current) onClose(); }}>
    <div className="modal card" ref={ref as any}>
      <h3 className="text-xl font-semibold mb-2">Logga en öl</h3>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="label">Ställe</label>
          {presetVenue
            ? <input className="input" value={`${presetVenue.name} (${presetVenue.city||""})`} disabled />
            : <>
                <input className="input" placeholder="Sök eller skriv nytt ställe" value={venueQuery} onChange={(e)=>{ setVenueQuery(e.target.value); setVenue(undefined);} } />
                {venueQuery && venues.length>0 &&
                  <div className="mt-2 max-h-40 overflow-auto card p-2">
                    {venues.map(v=>(
                      <button key={v.id} type="button" className="w-full text-left p-2 hover:bg-white/10 rounded" onClick={()=>{ setVenue(v); setVenueQuery(`${v.name}`); }}>
                        {v.name} <span className="opacity-60">{v.city}</span>
                      </button>
                    ))}
                  </div>
                }
              </>
          }
        </div>
        <div>
          <label className="label">Öl-namn</label>
          <input className="input" placeholder="Ex. Pilsner Urquell" value={beerName} onChange={(e)=>setBeerName(e.target.value)} />
        </div>
        <div>
          <label className="label">Öl-stil</label>
          <select className="select" value={beerStyle} onChange={(e)=>setBeerStyle(e.target.value)}>
            <option value="">Välj stil…</option>
            {BEER_STYLES.map(s=>(<option key={s} value={s}>{s}</option>))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Pris (SEK)</label>
            <input className="input" inputMode="decimal" placeholder="ex. 49" value={price} onChange={(e)=>setPrice(e.target.value)} />
          </div>
          <div>
            <label className="label">Betyg</label>
            <input type="range" min={1} max={5} step={1} value={rating} onChange={(e)=>setRating(parseInt(e.target.value))} className="w-full" />
          </div>
        </div>
        <div>
          <label className="label">Foto (valfritt)</label>
          <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0]||null)} />
        </div>
        {msg && <div className="text-sm opacity-90">{msg}</div>}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="btn" onClick={onClose}>Avbryt</button>
          <button type="submit" className="btn btn-amber" disabled={saving}>{saving?"Sparar…":"Spara"}</button>
        </div>
      </form>
    </div>
  </div>;
}