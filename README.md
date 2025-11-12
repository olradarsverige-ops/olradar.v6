# olradar-v6 export fix patch

Fixes `Error: The provided export path '/' doesn't match the '/[lang]' page` on Vercel.

### Included changes:
1. **next.config.js** — removes `i18n` and sets `output: 'standalone'`.
2. **app/page.tsx** — redirects `/` → `/sv` (root redirect only).
3. **app/[lang]/page.tsx** — no redirect, uses `generateStaticParams()` for `sv` and `en` to allow clean static export.

### Apply
- Unzip into repo root, preserving paths.
- Commit and deploy on Vercel.

### Verify
- `/` redirects to `/sv`
- `/sv` renders correctly
- `/en` renders correctly
