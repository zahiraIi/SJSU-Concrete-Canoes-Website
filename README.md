# SJSU Concrete Canoes Website

Framer-inspired SJSU Concrete Canoes site built with Next.js, Sanity CMS, and Framer Motion.

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Sanity Studio (`/studio`)
- Vercel-ready deployment

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing Content (Non-Technical)

1. Open `/studio` locally or in production.
2. Update page documents (`homePage`, `aboutPage`, `competitionsPage`, `donationsPage`, `contactPage`).
3. Upload photos in the relevant document fields or collections.

## Required Environment Variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

If environment variables are not set, the site uses built-in fallback content and local `public/images` assets.
