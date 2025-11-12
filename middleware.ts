// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  // Kör endast på startsidorna (justera vid behov)
  matcher: ["/", "/sv", "/en"],
};

export default function middleware(req: NextRequest) {
  try {
    // Läs ev. A/B-cookie
    const current = req.cookies.get("ab-variant")?.value;

    // Sätt variant om den saknas (helt lokalt, ingen IO)
    if (current !== "A" && current !== "B") {
      const variant = Math.random() < 0.5 ? "A" : "B";
      const res = NextResponse.next();
      res.cookies.set("ab-variant", variant, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 dagar
        sameSite: "lax",
      });
      return res;
    }

    // Annars: bara gå vidare
    return NextResponse.next();
  } catch {
    // Även vid fel: släpp vidare (krascha inte sidan)
    return NextResponse.next();
  }
}
