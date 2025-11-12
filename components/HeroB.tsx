"use client";
import Image from "next/image";
import { themeB } from "../styles/theme-b";
export default function HeroB(){
  return (<section style={{background:themeB.surface,border:`1px solid ${themeB.outline}`,borderRadius:18,padding:32,display:"grid",gridTemplateColumns:"1.2fr 0.8fr",gap:28,alignItems:"center",boxShadow:themeB.glow}}>
    <div>
      <span style={{display:"inline-block",background:themeB.chipBg,color:themeB.textSecondary,padding:"6px 12px",borderRadius:999}}>Ölradar / BeerRadar</span>
      <h1 style={{color:themeB.textPrimary,fontSize:"3rem",lineHeight:1.1,marginTop:14}}>Du loggar — andra hittar.</h1>
      <p style={{color:themeB.textSecondary,marginTop:8,fontSize:"1.1rem"}}>Tillsammans håller vi kartan levande. Hjälp nästa person hitta bästa priset.</p>
    </div>
    <div style={{width:"100%",borderRadius:14,overflow:"hidden"}}>
      <Image src="/images/hero-b.jpg" alt="Ölradar glass hero" width={960} height={640} priority style={{width:"100%",height:"auto",display:"block"}} onError={(e)=>{(e.currentTarget as HTMLImageElement).src="/images/hero-b-placeholder.svg"}}/>
    </div>
  </section>);
}