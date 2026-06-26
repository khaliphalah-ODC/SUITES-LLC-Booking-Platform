# The SUITES Project Guide

This guide is for Codex, other coding assistants, and team members working on **The SUITES** full-stack hotel/suite booking website.

No coding should begin until the team has agreed on this structure.

## 1. Project Identity

**Project Name:** The SUITES  
**Website Type:** Luxury hotel/suite booking website  
**Brand:** The SUITES LLC  
**Domain Idea:** `www.theSuitesLiberia.com`

**Stack:**

```txt
Frontend: Next.js
Backend: Node.js + Express.js
Database: PostgreSQL
```

The SUITES must remain separate from Stratova. This project is only for the hotel/suite booking platform.

The design should follow the uploaded UI direction:

```txt
Style: Emerald & Gold Editorial
Mood: Modern luxury, calm, elegant, premium hospitality
Fonts: Playfair Display + Montserrat
Main colors: Dark emerald, muted gold, warm white, soft beige, charcoal
```

## 2. Main Business Goal

The website should allow guests to:

```txt
Discover The SUITES
Browse luxury suites
Check suite details
Book a stay
Create optional guest account
View reservations
Receive notifications
Contact the hotel
Request experiences or amenities
```

The staff/admin side should allow the hotel team to:

```txt
Manage suites
Manage bookings
Manage guests
Manage staff
Manage payments
Manage amenities
Manage experiences
Manage gallery/content
Manage contact messages
```

Simple full-stack flow:

```txt
Guest uses website
↓
Next.js displays pages
↓
Express API handles business logic
↓
PostgreSQL stores data
↓
Frontend shows result to guest/admin
```

Example booking flow:

```txt
Guest chooses suite and dates
↓
Frontend sends booking request to backend
↓
Backend checks availability
↓
Backend saves booking in database
↓
Payment placeholder is created
↓
Guest sees confirmation
↓
Admin/staff can manage booking
```

## 3. Important Project Decisions

These decisions are already chosen:

```txt
Hotel scope: Single location
Suite model: Suite types with quantity
Guest accounts: Optional
Payment: Planned, but real gateway is placeholder for v1
Admin roles: Admin + Staff
```

Suite model example:

```txt
Deluxe Garden Suite: quantity 5
Executive Suite: quantity 3
Presidential Suite: quantity 1
```

This means guests book a **suite type**, not a specific room number.

## 4. Pages To Build

### Public Pages

```txt
/                         Home
/suites                   All suites
/suites/[slug]            Suite details
/booking                  Complete booking
/booking/confirmation     Booking confirmation
/amenities                Amenities
/experiences              Experiences
/gallery                  Gallery
/about                    About Us
/contact                  Contact Us
/login                    Login
/register                 Register
```

### Guest Account Pages

```txt
/account                  Guest dashboard
/account/reservations     My reservations
/account/payments         Payment history
/account/notifications    My notifications
/account/profile          Profile
```

### Admin/Staff Dashboard Pages

```txt
/dashboard                Dashboard overview
/dashboard/bookings       Manage bookings
/dashboard/suites         Manage suites
/dashboard/amenities      Manage amenities
/dashboard/experiences    Manage experiences
/dashboard/gallery        Manage gallery
/dashboard/messages       Contact messages
/dashboard/users          Manage users, admin only
/dashboard/settings       Settings, admin only
```

## 5. User Roles

### Guest

A visitor who is not logged in.

Can:

```txt
Browse pages
View suites
Search availability
Submit contact form
Start booking
Book without account
```

### Customer

A logged-in guest.

Can:

```txt
View account dashboard
View reservations
View payment history
View notifications
Edit profile
```

### Staff

Hotel worker.

Can:

```txt
View bookings
Update booking status
View contact messages
Handle guest requests
Send notifications
```

Cannot:

```txt
Manage users
Change payment settings
Delete core content
```

### Admin

Full access.

Can:

```txt
Manage users
Manage staff
Manage suites
Manage bookings
Manage content
Manage settings
Manage payment policy
```

## 6. Core Features

### Public Website Features

```txt
Luxury homepage
Suite search
Suite listing
Suite details
Booking form
Booking confirmation
Amenities page
Experiences page
Gallery
Contact form
Newsletter signup
```

### Booking Features

```txt
Check-in date
Check-out date
Guest count
Suite type
Guest information
Special requests
Price summary
Payment placeholder
Booking reference
Booking status
```

### Account Features

```txt
Register
Login
Logout
View reservations
View payment history
View notifications
Update profile
```

### Admin/Staff Features

```txt
Dashboard overview
Booking management
Suite management
Amenity management
Experience management
Gallery management
User management
Contact message management
Payment setting management
```

## 7. Database Tables

Use PostgreSQL.

Recommended tables:

```txt
users
suite_types
suite_images
amenities
suite_amenities
experiences
gallery_images
bookings
payments
notifications
contact_messages
bespoke_requests
newsletter_subscribers
settings
```

### `users`

Stores customers, staff, and admins.

Important fields:

```txt
id
first_name
last_name
email
phone
password_hash
role
membership_level
created_at
updated_at
```

Roles:

```txt
customer
staff
admin
```

### `suite_types`

Stores suite categories.

Important fields:

```txt
id
name
slug
short_description
description
price_per_night
quantity
max_guests
bed_type
size
status
featured
created_at
updated_at
```

Status examples:

```txt
active
inactive
maintenance
```

### `suite_images`

Stores suite photos.

```txt
id
suite_type_id
image_url
alt_text
is_primary
sort_order
created_at
```

### `amenities`

Stores reusable amenities.

```txt
id
name
slug
description
icon
category
created_at
```

### `suite_amenities`

Connects suites to amenities.

```txt
id
suite_type_id
amenity_id
```

### `experiences`

Stores experiences like rooftop dining, spa, culinary, culture.

```txt
id
title
slug
description
category
image_url
price
status
created_at
updated_at
```

### `gallery_images`

Stores gallery images.

```txt
id
title
image_url
alt_text
category
sort_order
created_at
```

### `bookings`

Stores reservations.

```txt
id
booking_reference
user_id
suite_type_id
guest_first_name
guest_last_name
guest_email
guest_phone
check_in_date
check_out_date
guest_count
special_requests
status
subtotal
tax_amount
total_amount
created_at
updated_at
```

Booking statuses:

```txt
pending_payment
paid
confirmed
cancelled
completed
```

### `payments`

Stores payment records.

For v1, this is a placeholder, not real Stripe/PayPal yet.

```txt
id
booking_id
amount
payment_method
payment_provider
payment_status
transaction_reference
created_at
updated_at
```

Payment statuses:

```txt
not_started
pending
paid
failed
refunded
```

### `notifications`

Stores guest notifications.

```txt
id
user_id
title
message
type
is_read
created_at
```

Notification types:

```txt
booking
payment
concierge
offer
system
```

### `contact_messages`

Stores contact form messages.

```txt
id
name
email
phone
subject
message
status
created_at
```

Message statuses:

```txt
new
read
resolved
```

### `bespoke_requests`

Stores special amenity/experience requests.

```txt
id
user_id
booking_id
name
email
phone
request_type
message
status
created_at
```

### `settings`

Stores admin-configurable settings.

```txt
id
key
value
created_at
updated_at
```

Example settings:

```txt
payment_mode = deposit
deposit_percentage = 30
hotel_email = info@theSuitesLiberia.com
hotel_phone = ...
```

## 8. Backend API Routes

Backend should be built with Express.

### Public Routes

```txt
GET    /api/suites
GET    /api/suites/:slug
GET    /api/amenities
GET    /api/experiences
GET    /api/gallery
POST   /api/bookings/check-availability
POST   /api/bookings
POST   /api/contact
POST   /api/bespoke-requests
POST   /api/newsletter
```

### Auth Routes

```txt
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### Customer Routes

```txt
GET    /api/account
PATCH  /api/account
GET    /api/account/bookings
GET    /api/account/bookings/:id
GET    /api/account/payments
GET    /api/account/notifications
PATCH  /api/account/notifications/:id/read
```

### Staff/Admin Routes

```txt
GET    /api/dashboard/bookings
GET    /api/dashboard/bookings/:id
PATCH  /api/dashboard/bookings/:id/status

GET    /api/dashboard/messages
PATCH  /api/dashboard/messages/:id/status

GET    /api/dashboard/bespoke-requests
PATCH  /api/dashboard/bespoke-requests/:id/status
```

### Admin-Only Routes

```txt
POST   /api/dashboard/suites
PATCH  /api/dashboard/suites/:id
DELETE /api/dashboard/suites/:id

POST   /api/dashboard/amenities
PATCH  /api/dashboard/amenities/:id
DELETE /api/dashboard/amenities/:id

POST   /api/dashboard/experiences
PATCH  /api/dashboard/experiences/:id
DELETE /api/dashboard/experiences/:id

POST   /api/dashboard/gallery
PATCH  /api/dashboard/gallery/:id
DELETE /api/dashboard/gallery/:id

GET    /api/dashboard/users
POST   /api/dashboard/users
PATCH  /api/dashboard/users/:id

GET    /api/dashboard/settings
PATCH  /api/dashboard/settings
```

## 9. Frontend Component Plan

Use Next.js.

### Layout Components

```txt
Navbar
Footer
PublicLayout
DashboardLayout
AccountLayout
Container
SectionHeader
PageHero
```

### Public Website Components

```txt
HeroSection
BookingSearchBar
SuiteCard
SuiteGrid
SuiteFilterBar
SuiteGallery
AmenityCard
ExperienceCard
GalleryGrid
ContactForm
NewsletterSection
TestimonialCard
```

### Booking Components

```txt
BookingStepper
GuestInfoForm
StayDetailsForm
PaymentPlaceholder
BookingSummary
ConfirmationMessage
```

### Account Components

```txt
AccountSidebar
UpcomingStayCard
ReservationCard
PaymentHistoryTable
NotificationCard
ProfileForm
```

### Dashboard Components

```txt
DashboardSidebar
DashboardHeader
StatsCard
BookingTable
SuiteForm
AmenityForm
ExperienceForm
GalleryManager
UserTable
StatusBadge
```

## 10. Suggested Frontend Folder Structure

Use this kind of structure:

```txt
frontend/
  app/
    page.tsx
    suites/
      page.tsx
      [slug]/
        page.tsx
    booking/
      page.tsx
      confirmation/
        page.tsx
    amenities/
      page.tsx
    experiences/
      page.tsx
    gallery/
      page.tsx
    about/
      page.tsx
    contact/
      page.tsx
    login/
      page.tsx
    register/
      page.tsx
    account/
      page.tsx
      reservations/
        page.tsx
      payments/
        page.tsx
      notifications/
        page.tsx
      profile/
        page.tsx
    dashboard/
      page.tsx
      bookings/
        page.tsx
      suites/
        page.tsx
      amenities/
        page.tsx
      experiences/
        page.tsx
      gallery/
        page.tsx
      messages/
        page.tsx
      users/
        page.tsx
      settings/
        page.tsx

  components/
    layout/
    public/
    booking/
    account/
    dashboard/
    ui/

  lib/
    api.ts
    auth.ts
    utils.ts

  styles/
    globals.css
```

For Next.js learners:

```txt
app/ = pages and routes
components/ = reusable UI pieces
lib/ = helper functions
styles/ = global styling
```


## 11. Backend Folder Structure

```txt
backend/
  src/
    app.js
    server.js

    config/
      database.js

    routes/
      auth.routes.js
      suites.routes.js
      bookings.routes.js
      account.routes.js
      dashboard.routes.js
      contact.routes.js

    controllers/
      auth.controller.js
      suites.controller.js
      bookings.controller.js
      account.controller.js
      dashboard.controller.js
      contact.controller.js

    services/
      booking.service.js
      availability.service.js
      payment.service.js
      notification.service.js

    middleware/
      auth.middleware.js
      role.middleware.js
      error.middleware.js
      validation.middleware.js

    db/
      migrations/
      seeds/

    utils/
      generateReference.js
      password.js
```

## 12. Team Task Division

Since the full team is not beginner-level, but you and one other person are new to Next.js:

### Experienced Frontend Lead

Responsible for:

```txt
Next.js setup
Routing structure
Layout system
API integration pattern
Auth handling
Dashboard architecture
Code review for frontend
```

### You and Other Next.js Learner

Best starting tasks:

```txt
Convert static UI pages into Next.js pages
Build reusable components
Work on About page
Work on Gallery page
Work on Amenities page
Work on Experiences page
Work on SuiteCard and AmenityCard
Learn routing and props
```

Avoid at first:

```txt
Auth logic
Payment flow
Complex booking state
Admin permissions
Advanced API integration
```

### Backend Developer

Responsible for:

```txt
Express setup
Database connection
API routes
Auth system
Booking logic
Availability logic
Payment placeholder
```

### Database Developer

Responsible for:

```txt
PostgreSQL schema
Migrations
Seed data
Relationships
Indexes
Testing queries
```

### UI/Content Person

Responsible for:

```txt
Brand wording
Images
Suite descriptions
Amenities copy
Experience copy
Gallery categories
Luxury tone consistency
```

### QA/Deployment Person

Responsible for:

```txt
Testing pages
Testing forms
Testing API routes
Testing mobile layout
Deployment setup
Environment variables
Production checks
```

## 13. Development Phases

### Phase 1: Planning

Finish:

```txt
Final pages
Final database schema
Final API routes
Final roles
Final suite list
Final content
```

### Phase 2: Project Setup

Build:

```txt
Next.js frontend
Express backend
PostgreSQL database
Environment variables
Git workflow
```

### Phase 3: Static Frontend

Build pages using uploaded UI:

```txt
Home
Suites
Amenities
Experiences
Gallery
About
Contact
Booking
Account
Notifications
```

At this stage, data can be fake/static.

### Phase 4: Backend + Database

Build:

```txt
Database tables
API routes
Seed data
Validation
Error handling
```

### Phase 5: Connect Frontend To Backend

Connect:

```txt
Suites page to /api/suites
Suite details to /api/suites/:slug
Booking page to /api/bookings
Contact form to /api/contact
Account pages to /api/account
```

### Phase 6: Auth + Roles

Build:

```txt
Register
LoginIs The SUITES LLC a property development company, or does it also own and operate hotel suites that customers can book online?
Logout
Customer sessions
Staff/admin access
Protected routes
```

### Phase 7: Dashboard

Build:

```txt
Admin dashboard
Staff dashboard
Booking management
Suite management
Message management
User management
```

### Phase 8: Payment Placeholder

Build:

```txt
Payment summary
Payment record creation
Payment status
Admin payment setting
```

Real payment provider can be added later.

### Phase 9: Testing

Test:

```txt
Booking flow
Login flow
Dashboard permissions
Mobile responsiveness
Form validation
API errors
Availability checking
```

### Phase 10: Deployment

Deploy:

```txt
Frontend to Vercel
Backend to Render/Railway/Fly.io
Database to Supabase/Neon/Railway
Images to Cloudinary/Supabase Storage
```

## 14. Environment Variables

Frontend:

```txt
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=
```

Backend:

```txt
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=
PAYMENT_MODE=
DEPOSIT_PERCENTAGE=
IMAGE_STORAGE_PROVIDER=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## 15. Testing Checklist

Before launch, confirm:

```txt
Home page loads correctly
Suites page displays suites
Suite details page works
Booking form validates fields
Booking creates database record
Availability prevents overbooking
Contact form saves message
Guest can register and login
Guest can view own bookings
Staff can manage bookings
Admin can manage suites
Staff cannot access admin-only settings
Mobile layout works
Images load correctly
Error messages are clear
Deployment environment variables work
```

## 16. Guidance For Codex Or Coding Assistants

Any coding assistant working on this project should follow these rules:

```txt
Do not mix this project with Stratova.
Use the uploaded UI as the visual reference.
Keep the Emerald & Gold Editorial style.
Use Next.js for frontend.
Use Express for backend.
Use PostgreSQL for database.
Do not skip planning before coding.
Keep components reusable.
Keep pages beginner-readable.
Protect admin/staff routes.
Do not implement real payment provider in v1 unless requested.
Use payment placeholder first.
Model suites as suite types with quantity.
Keep guest accounts optional.
```

When coding begins, assistants should work in this order:

```txt
1. Inspect current folder structure
2. Set up frontend/backend only if missing
3. Create shared design tokens/styles
4. Build static frontend pages
5. Build backend database schema
6. Build API routes
7. Connect frontend to backend
8. Add auth and roles
9. Add dashboard
10. Test everything
```

## 17. Personal Learning Guide

For the team members new to Next.js, focus on this order:

```txt
1. Learn what a Next.js page is
2. Learn what a route is
3. Learn what a component is
4. Learn props
5. Learn Tailwind classes
6. Learn how forms work
7. Learn how frontend calls backend APIs
8. Learn how auth protects pages
```

Best pages for Next.js learners to start with:

```txt
/about
/gallery
/amenities
/experiences
/contact
```

Best components for Next.js learners to start with:

```txt
Navbar
Footer
PageHero
SuiteCard
AmenityCard
ExperienceCard
GalleryGrid
ContactForm
```

Harder areas to learn later:

```txt
Booking availability
Authentication
Dashboard permissions
Payment flow
Database relationships
```

