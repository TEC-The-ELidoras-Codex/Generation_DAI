## Parent Agent (Next.js + Tailwind + MDX + Vitest)

A parent-first learning & safety companion with a wiki, Minecraft-themed reading/math pages, and a pluggable agent API.

### Quick start (Windows PowerShell)

1. Copy env

```pwsh
Copy-Item .env.example .env.local
```

2. Install deps

```pwsh
npm install
```

3. Dev server

```pwsh
npm run dev
```

4. Test

```pwsh
npm test
```

Open http://localhost:3000.

### Configure provider (optional)

- Set OPENAI_API_KEY or Azure equivalents in `.env.local`.
- API endpoint: `POST /api/agent` with `{ provider, prompt, context }`.

### Scripts

- dev, build, start, lint, test

### Structure

- `app/`: App Router pages (home, wiki, reading/math stubs, API route)
- `lib/providers/`: provider adapter and stubs
- `tests/`: vitest tests

### Notes

- Provider is stubbed until keys are set; returns demo text.
- MDX is enabled for `app/wiki` pages.

# Parent Agent

Parent-first learning and safety companion built with Next.js, Tailwind, and MDX.

## Quick start (Windows PowerShell)

```pwsh
# from the project root
npm install
# copy env
Copy-Item .env.example .env.local
# dev server
npm run dev
```

Open http://localhost:3000.

## Scripts
- dev: start dev server
- build: Next.js build
- start: run production server
- lint: run ESLint
- test: run Vitest

## Structure
- app/ — App Router pages (home, wiki, reading/math stubs)
- app/api/agent — agent API route
- lib/providers — provider adapters (OpenAI stub)
- app/wiki — MDX wiki pages

## Configure providers
Fill `.env.local` with your keys. The default provider is a stub until keys are set.

## Notes
- Tailwind is preconfigured in `globals.css` and `tailwind.config.ts`.
- MDX is enabled for wiki pages.