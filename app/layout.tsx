import "../styles/globals.css";
import type { Metadata } from "next";
import Providers from "../components/providers";
import { VariantProvider } from "../context/variant";
export const metadata: Metadata = { title: "Ölradar – v6 (A/B)", description: "Hitta bästa ölfynden nära dig (sv/en)." };
export default function RootLayout({children}:{children:React.ReactNode}){
  return (<html lang="sv" suppressHydrationWarning><body>
    <Providers><VariantProvider><div className="container">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Ölradar</h1>
      </header>
      {children}
    </div></VariantProvider></Providers>
  </body></html>);
}