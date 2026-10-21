# Mobitech Solution

A modern full-stack web application built with Next.js, Tailwind CSS, Prisma, and SQLite.

## Stack
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: Next.js API routes
- Database: Prisma + SQLite
- Contact form: persisted into a database for full-stack functionality

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

Open http://localhost:3000

## Project structure
- `src/app` – app router pages and API routes
- `src/components` – reusable UI components
- `src/lib` – Prisma client setup
- `prisma` – database schema
