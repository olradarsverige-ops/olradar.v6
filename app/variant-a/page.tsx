import HeroA from "../../components/HeroA";
import VariantToggle from "../../components/VariantToggle";
import VenueList from "../../components/venues/VenueList";
import { themeA } from "../../styles/theme-a";
export default function VariantAPage(){
  return (<main style={{background:themeA.background,borderRadius:18,padding:12,minHeight:"100vh"}}>
    <HeroA/>
    <VenueList/>
    <VariantToggle/>
  </main>);
}