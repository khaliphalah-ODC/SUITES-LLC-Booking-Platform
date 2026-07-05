# The SUITES LLC Booking Platform

Full-stack booking and operations platform for The SUITES LLC. The project includes a public hotel/suite booking website, guest account area, staff/admin dashboard, Express API, and PostgreSQL database.

## Project Status

The preview deployment is live and working:

```txt
Frontend: https://suites-llc-booking-platform-4lo3.vercel.app
Backend:  https://suites-llc-booking-platform.vercel.app
Health:   https://suites-llc-booking-platform.vercel.app/api/health
```

The backend is connected to Neon PostgreSQL. Authentication, admin dashboard access, booking confirmation, CORS, rate limiting, and Vercel preview deployment have been configured.

## What This App Does

Public website:

- Home, suites, suite details, amenities, experiences, dining, wellness, gallery, contact
- Booking flow with availability check and booking confirmation
- Guest registration and login

Guest area:

- Account overview
- Reservations
- Payments
- Notifications
- Profile management

Admin/staff dashboard:

- Operations overview
- Booking management
- Contact/message management
- Bespoke request management
- Suite, amenity, experience, gallery, user, and settings management

Backend/API:

- Express API under `/api`
- PostgreSQL models and migrations
- JWT access tokens and rotating refresh tokens
- Cookie auth plus bearer-token fallback for browsers that block cross-site cookies
- CORS support for Vercel preview domains
- Neon database support

## Repository Structure

```txt
.
├── backend/              Express API, migrations, seeds, admin/user scripts
├── frontend/             Next.js frontend app
├── suites-ui-ux/         Static UI/UX reference pages and design artifacts
├── project-doc.md        Business/project content notes
└── THE_SUITES_PROJECT_GUIDE.md
```

Important files:

```txt
backend/src/app.js
backend/src/server.js
backend/src/config/env.js
backend/src/config/database.js
backend/src/middleware/security.middleware.js
backend/src/db/migrations/
backend/src/db/seeds/
backend/scripts/run-sql.js
backend/scripts/create-user.js
frontend/src/lib/axios.js
frontend/src/app/
frontend/src/components/
frontend/src/services/
```

## Tech Stack

Frontend:

- Next.js
- React
- Axios
- CSS/Tailwind-style utility classes

Backend:

- Node.js
- Express
- PostgreSQL
- `pg`
- JWT
- bcrypt
- Cloudinary-ready upload support

Infrastructure:

- Vercel frontend deployment
- Vercel backend/serverless deployment
- Neon PostgreSQL database

## Local Setup

Install dependencies separately for backend and frontend.

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

Create local env files:

```txt
backend/.env
frontend/.env
```

Do not commit `.env` files. They contain secrets.

## Backend Environment

`backend/.env` should contain:

```txt
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

DATABASE_URL=postgresql://USER:PASSWORD@HOST/DB?sslmode=require
DATABASE_SSL=true

JWT_SECRET=change-this-to-a-long-random-secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_DAYS=30
COOKIE_SECURE=false

TAX_RATE=0
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_API_MAX=300
RATE_LIMIT_AUTH_MAX=100
RATE_LIMIT_WRITE_MAX=60

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=the-suites
```

For local development, `COOKIE_SECURE=false` is fine. In Vercel/production, use `COOKIE_SECURE=true`.

## Frontend Environment

`frontend/.env` should contain:

```txt
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For Vercel preview:

```txt
NEXT_PUBLIC_API_URL=https://suites-llc-booking-platform.vercel.app/api
```

The `/api` suffix is required because frontend services call paths like `/auth/login`, `/suites`, and `/dashboard`.

## Run Locally

Terminal 1:

```bash
cd backend
npm run dev
```

Backend runs at:

```txt
http://localhost:5000
```

Terminal 2:

```bash
cd frontend
npm run dev
```

Frontend runs at:

```txt
http://localhost:3000
```

## Database Setup

Run migrations and seed data from the backend folder:

```bash
cd backend
npm run db:migrate
npm run db:seed
```

Migrations create tables. Seed data adds starter suites, amenities, experiences, gallery images, and settings.

Running SQL against Neon changes the database only. It does not require a Git commit unless you also changed project files.

## Create Admin And Staff Users

Use the user creation script against the database in `backend/.env`.

Create or update an admin:

```bash
cd backend
USER_ROLE="admin" USER_EMAIL="admin@example.com" USER_PASSWORD="Admin1234" npm run user:create
```

Create or update staff:

```bash
cd backend
USER_ROLE="staff" USER_EMAIL="staff@example.com" USER_PASSWORD="Staff1234" npm run user:create
```

Optional name fields:

```bash
USER_ROLE="staff" \
USER_EMAIL="staff@example.com" \
USER_PASSWORD="Staff1234" \
USER_FIRST_NAME="Front" \
USER_LAST_NAME="Desk" \
npm run user:create
```

The older admin-only script still works:

```bash
ADMIN_EMAIL="admin@example.com" ADMIN_PASSWORD="Admin1234" npm run admin:create
```

## Common Commands

Backend:

```bash
cd backend
npm run dev
npm run db:migrate
npm run db:seed
npm run user:create
npm start
```

Frontend:

```bash
cd frontend
npm run dev
npm run lint
npm run build
npm start
```

## Deployment Guide

There are two Vercel projects from the same Git repository.

Frontend Vercel project:

```txt
Root Directory: frontend
Framework: Next.js
Build Command: npm run build
Environment:
NEXT_PUBLIC_API_URL=https://suites-llc-booking-platform.vercel.app/api
```

Backend Vercel project:

```txt
Root Directory: backend
Framework: Other
Environment:
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DB?sslmode=require
DATABASE_SSL=true
JWT_SECRET=use-a-long-random-secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_DAYS=30
FRONTEND_URL=https://suites-llc-booking-platform-4lo3.vercel.app
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

If Vercel creates extra preview URLs, add them to `FRONTEND_URL` separated by commas:

```txt
FRONTEND_URL=https://main-frontend.vercel.app,https://preview-hash.vercel.app
```

After changing Vercel environment variables, redeploy the affected project.

## Authentication Notes

The app supports two auth paths:

- HttpOnly cookies for normal browser sessions
- Bearer token fallback stored by the frontend for browsers that block cross-site cookies

This is important because the frontend and backend are currently on different Vercel subdomains.

If login works but the dashboard logs out while loading:

1. Redeploy the latest frontend.
2. Redeploy the latest backend.
3. Clear browser site data or test in private browsing.
4. Confirm backend login response and dashboard requests are using the current deployment.

## Team Workflow For 3 Contributors

Recommended ownership:

```txt
Person 1: Frontend public pages and booking UX
Person 2: Admin dashboard, guest account, frontend API integration
Person 3: Backend API, database migrations, auth, deployment/infrastructure
```

Branch naming:

```txt
feature/frontend-booking-flow
feature/dashboard-content-manager
feature/backend-booking-api
fix/auth-session-refresh
fix/vercel-env-cors
```

Basic workflow:

```bash
git pull
git checkout -b feature/your-task-name
# make changes
npm run lint      # in frontend when touching frontend
npm run build     # in frontend before deploy-related changes
git status
git add <changed-files>
git commit -m "Clear message about the change"
git push
```

Rules for the team:

- Do not commit `.env` files.
- Do not commit database passwords, Neon URLs, JWT secrets, or Cloudinary secrets.
- Run migrations intentionally; do not add destructive SQL without review.
- Keep frontend changes inside `frontend/` unless backend changes are required.
- Keep backend changes inside `backend/` unless frontend integration is required.
- If you change API responses, update the frontend services that consume them.
- If you change database schema, add or update a migration file.
- If you change deployment env names, update this README.

## Git And Database Rules

Commit code changes such as:

- New scripts
- Updated API routes/controllers/models
- Frontend components/pages/services
- Migrations and seed files
- README/docs changes
- Package scripts or dependencies

Do not commit:

- `.env`
- `node_modules`
- Local SQL scratch files
- Screenshots or temporary files unless intentionally part of docs/design

Running SQL directly in Neon does not create a Git change. If the SQL is important for future environments, turn it into a migration or seed file and commit that.

## Useful API Endpoints

Health:

```txt
GET /api/health
```

Auth:

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
```

Public catalogue:

```txt
GET /api/suites
GET /api/suites/:slug
GET /api/amenities
GET /api/experiences
GET /api/gallery
```

Bookings:

```txt
POST /api/bookings/check-availability
POST /api/bookings
```

Dashboard:

```txt
GET   /api/dashboard
GET   /api/dashboard/bookings
GET   /api/dashboard/messages
GET   /api/dashboard/users
PATCH /api/dashboard/settings
```

## Troubleshooting

Network Error during login:

- Confirm `NEXT_PUBLIC_API_URL` points to the backend and includes `/api`.
- Confirm backend `FRONTEND_URL` contains the frontend domain.
- Confirm backend has been redeployed after env changes.

Dashboard logs out after login:

- Confirm latest frontend auth fallback is deployed.
- Clear browser site data.
- Confirm admin/staff user exists in Neon.

`401 Unauthorized` on `/auth/me`:

- User is not logged in, token expired, or browser is not sending/storing auth.
- Log in again after clearing site data.

`429 Too Many Requests`:

- Auth rate limit was hit.
- Wait for the 15-minute window or increase `RATE_LIMIT_AUTH_MAX` in backend Vercel env for preview testing.

Vercel build error about `useSearchParams()`:

- Components using `useSearchParams()` must be wrapped in `Suspense`.

## Documentation

More detail:

```txt
backend/README.md
frontend/README.md
project-doc.md
THE_SUITES_PROJECT_GUIDE.md
```

Keep this root README as the team onboarding and coordination guide.
