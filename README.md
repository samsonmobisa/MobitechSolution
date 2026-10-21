# Mobitech Solution

A modern full-stack business site and CRM for Mobitech Solution, built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL for Vercel deployment.

## Stack
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: Next.js API routes
- Authentication: NextAuth with credential-based login
- Database: Prisma + PostgreSQL (recommended for Vercel)
- Payments: Stripe checkout integration
- CRM: lead, client, project, invoice, and dashboard views

## Features
- Professional marketing site and service landing page
- Contact form with persistent storage
- Admin authentication and protected dashboard
- CRM overview with leads, invoices, clients, and growth KPIs
- Pricing and Stripe checkout flow
- Vercel-ready deployment configuration

## Vercel setup

1. Create a managed PostgreSQL database (Neon, Supabase, Railway, PlanetScale, etc.).
2. In Vercel Project Settings > Environment Variables, add:
   - `NEXTAUTH_URL=https://your-domain.vercel.app`
   - `NEXTAUTH_SECRET=<generate a strong secret>`
   - `NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app`
   - `DATABASE_URL=<postgres connection string>`
   - `STRIPE_SECRET_KEY=<your Stripe secret key>`
3. Import the repo to Vercel and deploy.

## Local setup (optional)

If you want to run locally, create a `.env` file using the values in `.env.example` and use a local Postgres database or a dev database provider.

1. Install dependencies:
   npm install

2. Configure environment variables:
   cp .env.example .env

3. Generate Prisma client and initialize the database:
   npx prisma generate
   npx prisma db push
   npm run db:seed

4. Run the app locally:
   npm run dev

5. Visit:
   http://localhost:3000

## Default admin login
- Email: admin@mobitechsolution.com
- Password: admin12345

## Project structure
- `src/app` – app pages, API routes, and dashboard
- `src/components` – reusable UI modules
- `src/lib` – auth and Prisma configuration
- `prisma` – schema and database models

## Notes
- SQLite is not recommended for Vercel because the filesystem is ephemeral.
- PostgreSQL is the correct database choice for production deployment on Vercel.
- Stripe checkout requires a valid `STRIPE_SECRET_KEY`.
