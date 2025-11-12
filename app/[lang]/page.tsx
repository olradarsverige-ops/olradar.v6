// app/[lang]/page.tsx
export const dynamic = 'error'; // force static generation
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: 'sv' }, { lang: 'en' }];
}

const SUPPORTED = new Set(['sv', 'en']);

type Props = {
  params: { lang: string };
};

export default function LangPage({ params }: Props) {
  const lang = SUPPORTED.has(params.lang) ? params.lang : 'sv';
  const t = (sv: string, en: string) => (lang === 'sv' ? sv : en);

  return (
    <main style={{ padding: '32px', color: 'white', background: '#1e1e1e' }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>{t('Ölradar', 'BeerRadar')}</h1>
      <p style={{ opacity: 0.8 }}>{t('Du loggar – andra hittar.', 'You log – others find.')}</p>
    </main>
  );
}
