// app/page.tsx
// Server Component: Redirect root to default language
import { redirect } from "next/navigation";

export default function RootRedirect() {
  redirect("/sv");
}
