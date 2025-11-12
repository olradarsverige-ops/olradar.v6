"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
type Variant = "a" | "b"; type Ctx={variant:Variant; setVariant:(v:Variant)=>void};
const VariantContext=createContext<Ctx|null>(null); const KEY="olr-variant";
export function VariantProvider({children}:{children:React.ReactNode}){
  const [variant,setVariantState]=useState<Variant>("a");
  const router=useRouter(); const pathname=usePathname();
  useEffect(()=>{const stored=(typeof window!=="undefined"&&(localStorage.getItem(KEY) as Variant))||null; if(stored&&stored!==variant) setVariantState(stored)},[]);
  useEffect(()=>{ if(!pathname) return; const target=variant==="a"?"/variant-a":"/variant-b";
    if(pathname==="/"||pathname.startsWith("/variant-")){ if(pathname!==target) router.replace(target);} },[variant,pathname,router]);
  const setVariant=(v:Variant)=>{ setVariantState(v); if(typeof window!=="undefined") localStorage.setItem(KEY,v); router.push(v==="a"?"/variant-a":"/variant-b"); };
  const value=useMemo(()=>({variant,setVariant}),[variant]); return <VariantContext.Provider value={value}>{children}</VariantContext.Provider>;
}
export function useVariant(){ const ctx=useContext(VariantContext); if(!ctx) throw new Error("useVariant must be used within VariantProvider"); return ctx; }