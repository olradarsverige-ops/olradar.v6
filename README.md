# olradar-v6 root fix patch

This patch adds:
1) `app/page.tsx` — redirects `/` to `/sv` so the root route no longer 404s.
2) `app/[lang]/page.tsx` — includes `generateStaticParams()` for `sv/en`. A minimal page implementation is provided. If you already have a richer `[lang]/page.tsx`, keep your UI and copy **only** the `generateStaticParams` export into it.
3) `next.config.js` — optional i18n hint (sv/en). Safe with the current route setup.

## How to apply
- Drop these files into your repo preserving paths.
- Commit & deploy to Vercel.
- Test: `/` should redirect to `/sv`. `/en` also renders.

If you use a different default language, change `/sv` inside `app/page.tsx`.
