# DEMORA — Premium T-Shirt E-Commerce

Stack: Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion | Express API | PostgreSQL + Prisma | Cloudinary/S3

## Quick start
1. `cp .env.example .env` and fill in values
2. `docker compose up -d`        (PostgreSQL)
3. `pnpm install`
4. `pnpm --filter @demora/db prisma migrate dev --name init`
5. `pnpm --filter @demora/db seed`   -> admin@demora.com / demora123 + placeholder tees
6. `pnpm --filter api dev`           -> http://localhost:4000
7. `pnpm --filter web dev`           -> http://localhost:3000

## Storefront (/ , /shop , /product/:slug , /cart , /checkout)
- Luxury preloader, editorial layout, smooth scroll, hover motion (matches reference)
- Homepage: hero, shop-by-category, new arrivals, newsletter
- COD default at checkout; CARD / MOBILE_BANKING stubs ready for Stripe/bKash/Nagad keys
- Free shipping over ৳3000, flat ৳120 otherwise (edit in apps/api/src/routes/orders.ts)

## Admin (/admin)
- Login: admin@demora.com / demora123 (change in seed)
- Dashboard: revenue, orders, products, subscribers, low-stock alerts
- Products: drag-and-drop rows to set display order, inline stock edit, status, delete
- Orders: view details, update status (PLACED → CONFIRMED → SHIPPED → DELIVERED)

## Notes
- All images are placeholders (placehold.co gradients) — swap with real Cloudinary URLs in the seed or admin.
- Newsletter signups persist to the NewsletterSubscriber table.
