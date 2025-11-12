import HeroB from "../../components/HeroB";
import VariantToggle from "../../components/VariantToggle";
import VenueList from "../../components/venues/VenueList";
import { themeB } from "../../styles/theme-b";
export default function VariantBPage(){
  return (<main style={{background:themeB.background,borderRadius:18,padding:12,minHeight:"100vh"}}>
    <HeroB/>
    <VenueList/>
    <VariantToggle/>
  </main>);
}