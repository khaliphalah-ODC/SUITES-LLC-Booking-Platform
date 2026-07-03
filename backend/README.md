# The SUITES Backend

Express + PostgreSQL API for The SUITES hotel/suite booking platform.

## Setup

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

For Neon, click **Connect** in the Neon console and copy the pooled PostgreSQL
connection string into `DATABASE_URL` in `backend/.env`. Keep
`DATABASE_SSL=true`; Neon requires SSL.

If migration fails with `permission denied for schema public`, grant the database user schema
permissions from your terminal:

```bash
sudo -u postgres psql -d suites_hotel -c "GRANT USAGE, CREATE ON SCHEMA public TO suites_user; ALTER SCHEMA public OWNER TO suites_user;"
```

Then rerun:

```bash
npm run db:migrate
npm run db:seed
```

Required environment variables:

```txt
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DB?sslmode=require
DATABASE_SSL=true
JWT_SECRET=
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_DAYS=30
FRONTEND_URL=http://localhost:3000
PORT=5000
```

Optional:

```txt
TAX_RATE=0
COOKIE_SECURE=false
BCRYPT_SALT_ROUNDS=12
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=the-suites
```

## Core Routes

Public catalogue:

```txt
GET  /api/suites
GET  /api/suites/:slug
GET  /api/amenities
GET  /api/experiences
GET  /api/gallery
```

Booking and guest intake:

```txt
POST /api/bookings/check-availability
POST /api/bookings
POST /api/contact
POST /api/bespoke-requests
POST /api/newsletter
```

Auth/account:

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
GET  /api/account/bookings
GET  /api/account/payments
GET  /api/account/notifications
```

Auth uses short-lived JWT access tokens and rotating refresh tokens. Refresh tokens
are stored as SHA-256 hashes in the `refresh_tokens` table and are also available
as an httpOnly `refresh_token` cookie.

List endpoints support pagination and filtering:

```txt
GET /api/suites?page=1&limit=12&search=garden&max_guests=2&min_price=100&max_price=300&sort=price_asc
GET /api/amenities?page=1&limit=12&search=wifi&category=Comfort
GET /api/experiences?page=1&limit=12&search=dining&category=Dining
GET /api/gallery?page=1&limit=12&category=Suites
GET /api/dashboard/bookings?page=1&limit=20&status=confirmed&search=SUITES
GET /api/dashboard/messages?page=1&limit=20&status=new&search=guest
GET /api/dashboard/users?page=1&limit=20&role=staff&search=admin
```

Staff/admin dashboard routes live under `/api/dashboard`. Staff can manage bookings, messages, and bespoke requests. Admins can also manage suites, amenities, experiences, gallery, users, and settings.

Image uploads:

```txt
POST /api/dashboard/uploads/image
```

This route is admin-only and expects multipart form-data with an `image` field. It
requires Cloudinary environment variables in production.

## Vercel Preview Deployment

This backend can run on Vercel for client preview. Create a separate Vercel
project with the root directory set to `backend`.

Set these environment variables in the backend Vercel project:

```txt
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DB?sslmode=require
DATABASE_SSL=true
JWT_SECRET=use-a-long-random-secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_DAYS=30
FRONTEND_URL=https://your-frontend-preview.vercel.app
COOKIE_SECURE=true
TAX_RATE=0
RATE_LIMIT_API_MAX=300
RATE_LIMIT_AUTH_MAX=100
RATE_LIMIT_WRITE_MAX=60
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=the-suites
```

After the frontend deploys, copy the final frontend URL into `FRONTEND_URL` and
redeploy/restart the backend preview so CORS and secure cookies work.
