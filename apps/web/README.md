# Technical Tests Web

Next.js 16 frontend for Technical Tests Portfolio.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

3. Start development server:
```bash
npm run dev
```

Visit http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Structure

- `app/` - Next.js 16 App Router pages
  - `(auth)/` - Authentication pages (login, signup)
  - `(public)/` - Public pages (landing page)
  - `dashboard/` - Protected dashboard pages
- `components/` - React components
  - `ui/` - shadcn/ui components
  - `forms/` - Form components
  - `dashboard/` - Dashboard-specific components
- `lib/` - Utilities and helpers
  - `api/` - API client
  - `supabase/` - Supabase client setup
  - `types/` - TypeScript types
  - `validations/` - Zod schemas
