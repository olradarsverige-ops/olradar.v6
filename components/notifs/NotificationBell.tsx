"use client";
import { useEffect, useRef, useState } from "react";
export default function NotificationBell({ cityGetter }:{ cityGetter: ()=>string }){
  const [enabled, setEnabled] = useState(false);
  const [threshold, setThreshold] = useState<number>(45);
  const bestRef = useRef<number|undefined>(undefined);
  const timerRef = useRef<any>(null);
  useEffect(()=>{ const s = localStorage.getItem("olr-alert-enabled"); setEnabled(s === "1"); const t = localStorage.getItem("olr-alert-threshold"); if(t) setThreshold(parseInt(t)); },[]);
  useEffect(()=>{
    if(!enabled){ if(timerRef.current){ clearInterval(timerRef.current); timerRef.current=null; } return; }
    if(typeof Notification !== "undefined" && Notification.permission === "default"){ Notification.requestPermission(); }
    const fn = async ()=>{
      try{
        const city = cityGetter();
        const res = await fetch(`/api/nearby?city=${encodeURIComponent(city)}&sort=cheapest`, { cache: "no-store" });
        const data = await res.json();
        const price = data?.items?.[0]?.deal?.price_sek;
        if(typeof price === "number"){
          if(bestRef.current===undefined) bestRef.current = price;
          if(price <= threshold && price < (bestRef.current ?? 1e9)){
            bestRef.current = price;
            if(typeof Notification !== "undefined" && Notification.permission === "granted"){
              new Notification("Ny deal!", { body: `Från ${price} kr i ${city}` });
            }
          }
        }
      }catch(_e){}
    };
    fn();
    timerRef.current = setInterval(fn, 60_000);
    return ()=>{ if(timerRef.current) clearInterval(timerRef.current); };
  },[enabled, threshold, cityGetter]);
  return <div className="card p-3 flex items-center gap-3">
    <div className="flex-1">
      <div className="font-semibold">Deal Alert</div>
      <div className="text-sm opacity-70">Få notis när en ny deal under X kr dyker upp.</div>
    </div>
    <input className="input w-24" type="number" min={10} step={1} value={threshold} onChange={(e)=>{ const v=parseInt(e.target.value||"45"); setThreshold(v); localStorage.setItem("olr-alert-threshold", String(v)); }} />
    <button className="btn btn-amber" onClick={()=>{ const n=!enabled; setEnabled(n); localStorage.setItem("olr-alert-enabled", n?"1":"0"); }}>{enabled?"På":"Av"}</button>
  </div>;
}