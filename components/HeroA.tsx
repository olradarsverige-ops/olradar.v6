"use client";
import Image from "next/image";
import { themeA } from "../styles/theme-a";
export default function HeroA(){
  return (<section style={{background:themeA.surface,border:`1px solid ${themeA.outline}`,borderRadius:18,padding:32,display:"grid",gridTemplateColumns:"1.2fr 0.8fr",gap:28,alignItems:"center",boxShadow:themeA.shadow}}>
    <div>
      <span style={{display:"inline-block",background:themeA.chipBg,color:themeA.textSecondary,padding:"6px 12px",borderRadius:999}}>Ölradar / BeerRadar</span>
      <h1 style={{color:themeA.textPrimary,fontSize:"3rem",lineHeight:1.1,marginTop:14}}>Du loggar — andra hittar.</h1>
      <p style={{color:themeA.textSecondary,marginTop:8,fontSize:"1.1rem"}}>Logga ölen där du är. Hjälp andra att hitta bra priser. Tillsammans håller vi kartan levande.</p>
    </div>
    <div style={{width:"100%",borderRadius:14,overflow:"hidden"}}>
      <Image src="/images/hero-a.jpg" alt="Ölradar emblem" width={960} height={640} priority style={{width:"100%",height:"auto",display:"block"}} onError={(e)=>{(e.currentTarget as HTMLImageElement).src="/images/hero-a-placeholder.svg"}}/>
    </div>
  </section>);
}