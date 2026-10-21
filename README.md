# Mobitech Solution

A modern full-stack business site and CRM for Mobitech Solution, built with Next.js, TypeScript, Tailwind CSS, Prisma, and SQLite.

## Stack
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: Next.js API routes
- Authentication: NextAuth with credential-based login
- Database: Prisma + SQLite
- Payments: Stripe checkout integration
- CRM: lead, client, project, invoice, and dashboard views

## Features
- Professional marketing site and service landing page
- Contact form with persistent storage
- Admin authentication and protected dashboard
- CRM overview with leads, invoices, clients, and growth KPIs
- Pricing and Stripe checkout flow
- Deployment-ready config for Vercel and Azure App Service

## Getting started

1. Install dependencies:
   npm install

2. Set up environment variables:
   cp .env.example .env

3. Generate Prisma client and initialize the database:
   npx prisma generate
   npx prisma db push

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

## Deployment

### Vercel
1. Push the project to GitHub.
2. Import the repo into Vercel.
3. Add environment variables from `.env.example`.
4. Set the build command to `npm run build`.
5. Deploy.

### Azure App Service
1. Create a Linux or Node.js App Service.
2. Set the startup command: `npm run start` or use the Azure startup script with Next.js.
3. Add the same environment variables.
4. Run `npm install` and `npm run build` in the deployment pipeline.

## Notes
- Stripe checkout requires a valid `STRIPE_SECRET_KEY`.
- For production, replace the default secret values and configure secure HTTPS domains.
