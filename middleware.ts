import { NextResponse, NextRequest } from "next/server";
const COOKIE="olr_ab"; const A_URL="/variant-a"; const B_URL="/variant-b";
export function middleware(req: NextRequest){
  const { pathname } = req.nextUrl; const isRoot = pathname === "/"; const isVariant = pathname === "/variant-a" || pathname === "/variant-b";
  if (!isRoot && !isVariant) return NextResponse.next();
  const cookie = req.cookies.get(COOKIE)?.value as "a"|"b"|undefined;
  if (!cookie){ const pick = Math.random() < .5 ? "a" : "b"; const res = NextResponse.redirect(new URL(pick==="a"?A_URL:B_URL, req.url)); res.cookies.set(COOKIE, pick, { path:"/", httpOnly:false, sameSite:"lax", maxAge: 60*60*24*30 }); return res; }
  if (isRoot){ const target = cookie==="a"?A_URL:B_URL; return NextResponse.redirect(new URL(target, req.url)); }
  return NextResponse.next();
}
export const config = { matcher: ["/","/variant-a","/variant-b"] };