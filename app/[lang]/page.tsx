// app/[lang]/page.tsx
// Basic language-aware page. Includes generateStaticParams for sv/en so Vercel builds both.
// If you already have a richer implementation, copy the generateStaticParams export
// into your existing file and keep your UI code.
export function generateStaticParams() {
  return [{ lang: "sv" }, { lang: "en" }];
}

export default function LangHome({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const t = (sv: string, en: string) => (lang === "sv" ? sv : en);

  return (
    <main className="min-h-screen gradient-bg text-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-semibold mb-2">Ölradar / BeerRadar</h1>
        <p className="text-lg opacity-80 mb-6">
          {t("Du loggar – andra hittar.", "You log – others find.")}
        </p>

        <a
          href={`/${lang}/app`}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-amber-500 text-black hover:brightness-110 transition"
        >
          {t("Gå till appen", "Open app")}
        </a>
      </div>
    </main>
  );
}
