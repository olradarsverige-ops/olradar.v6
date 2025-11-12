"use client";
import { useVariant } from "../context/variant";
export default function VariantToggle(){
  const {variant,setVariant}=useVariant();
  return <div style={{position:"fixed",right:16,bottom:16,zIndex:60,display:"flex",gap:8,background:"rgba(0,0,0,0.45)",border:"1px solid rgba(255,255,255,0.12)",backdropFilter:"blur(6px)",padding:6,borderRadius:999}} aria-label="Växla A/B-variant">
    <button onClick={()=>setVariant("a")} style={{padding:"8px 14px",borderRadius:999,border:0,fontWeight:700,cursor:"pointer",color:variant==="a"?"#111":"#ddd",background:variant==="a"?"#C08B4D":"transparent"}}>A</button>
    <button onClick={()=>setVariant("b")} style={{padding:"8px 14px",borderRadius:999,border:0,fontWeight:700,cursor:"pointer",color:variant==="b"?"#111":"#ddd",background:variant==="b"?"#DAAC55":"transparent"}}>B</button>
  </div>;
}