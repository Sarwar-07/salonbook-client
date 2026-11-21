# SalonBook — Salon Appointment Booking Platform

> An editorial luxury salon & wellness reservation platform connecting discerning clients with master artisans. Crafted with modern web technologies, real-time availability verification, secure online checkout, and comprehensive role-based dashboards.

---

## 🌐 Live Deployments & Repository Links

- **Live Website**: [https://salonbook-client-three.vercel.app](https://salonbook-client-three.vercel.app)
- **Live API Server**: [https://salonbook-server-eight.vercel.app](https://salonbook-server-eight.vercel.app)
- **Client GitHub Repository**: [https://github.com/Sarwar-07/salonbook-client](https://github.com/Sarwar-07/salonbook-client)
- **Server GitHub Repository**: [https://github.com/Sarwar-07/salonbook-server](https://github.com/Sarwar-07/salonbook-server)

---

## 🔑 Evaluator & Demo Credentials

Use the following pre-configured credentials to evaluate the platform without having to register new accounts:

| Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@salonbook.com` | `Admin@1234` | Full analytics KPI suite, service catalog CRUD, master booking confirmations, client role management & user blocking. |
| **Customer** | `customer@salonbook.com` | `Customer@1234` | Treatment browsing, live slot reservation, booking overview, Stripe payment checkout, and client profile management. |

*(Quick-fill buttons are also available directly on the `/login` page for fast testing.)*

---

## ✨ Important Features

### 1. Seamless Customer Booking Flow
- **Bespoke Treatment Catalog**: Filter treatments across Hair, Skin, Makeup, Spa, and Nails with debounced search, category pills, and sorting.
- **Dynamic Slot Availability**: Real-time slot selector checks confirmed and pending slots to prevent conflicting double-bookings.
- **Special Requests & Notes**: Clients can specify allergies, styling preferences, or special accommodations during booking.

### 2. Comprehensive Admin Control Suite
- **6 Key Performance Indicators (KPIs)**: Real-time overview monitoring Total Registered Customers, Active Services, Total Appointment Requests, Pending Appointments, Confirmed Appointments, and Successful Payments (with gross USD revenue).
- **Service Catalog Management**: Add, update, activate/deactivate, and delete salon treatments with positive duration and price validation.
- **Appointment Lifecycle Transitions**: Administrators can confirm pending appointments or cancel appointments directly from the table.
- **Client Account Moderation**: Toggle user roles between Administrator and Customer, and suspend/unblock problematic accounts in real time.
- **Financial Transaction Ledger**: Complete view of all Stripe transactions cross-referenced with appointment dates and payment session identifiers.

### 3. Modern Authentication & Session Security (Better Auth + JWT)
- **Hybrid Auth Architecture**: Better Auth with MongoDB adapter handles email/password credentials and Google OAuth (`prompt: "select_account"` and account linking).
- **Backend JWT Synchronization**: Automatically exchanges authenticated sessions for signed JWT bearer tokens for secure communication with the Express backend.
- **Strict Password Rules**: Enforces minimum 6 characters, at least one uppercase letter (`A-Z`), and at least one lowercase letter (`a-z`).
- **Route & Block Protection**: Persistent dashboard sidebar shell validates authentication and immediately signs out and alerts suspended users.

### 4. Double-Booking & Slot Conflict Prevention
- Real-time availability checks ensure overlapping requests for the same date and time slot cannot be booked simultaneously.

### 5. Secure Stripe Payments & Webhook Synchronization
- **Strict Payment Eligibility**: Clients can only initiate payment when an appointment has been explicitly confirmed by an administrator (`status === 'confirmed' && paymentStatus === 'unpaid'`).
- **Webhook Reconciliation**: Secure Stripe webhook events instantly update appointment payment status to `paid` and generate immutable transaction receipts in the ledger.

### 6. Cloud Image Uploads via ImgBB
- Direct browser-to-cloud file uploads for service photography and user profile pictures using the ImgBB API (`NEXT_PUBLIC_IMGBB_API_KEY`).
- Live image previews, loading spinners, file format validation, and removal options.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router)
- **Library**: [React](https://react.dev/) 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Authentication**: [Better Auth](https://www.better-auth.com/) with MongoDB Adapter & Google OAuth 2.0
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Payments**: [Stripe](https://stripe.com/) Checkout Sessions & Webhooks
- **Image Hosting**: [ImgBB API](https://api.imgbb.com/)
- **Hosting & Deployment**: [Vercel](https://vercel.com/)

---

## 📦 Getting Started & Local Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.18.0 or later recommended)
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), or [yarn](https://yarnpkg.com/)
- A running instance of the [SalonBook Server](https://github.com/Sarwar-07/salonbook-server) or the live API endpoint

### 1. Clone the Repository
```bash
git clone https://github.com/Sarwar-07/salonbook-client.git
cd salonbook-client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and populate it with your environment keys (see template below):

```bash
cp .env.example .env.local
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔐 Required Environment Variables

Place these variables inside your `.env.local` file. **Never commit actual production keys or database credentials to version control.**

```env
# Backend REST API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# ImgBB API Key for Image Uploads
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here

# Better Auth Configuration
BETTER_AUTH_SECRET=your_32_character_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000

# MongoDB Database Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/salonbook_db?retryWrites=true&w=majority
DB_NAME=salonbook_db

# Google OAuth 2.0 Credentials (Optional for Social Login)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Shared JWT Secret for Backend API Handshakes
JWT_SECRET=your_shared_jwt_secret_key_here
```

---

## 📁 Project Structure

```
salonbook-client/
├── public/                  # Static assets & brand media
├── src/
│   ├── app/                 # Next.js App Router routes & pages
│   │   ├── about/           # Brand philosophy, master artisans & hygiene standards
│   │   ├── api/auth/        # Better Auth catch-all route handler
│   │   ├── contact/         # Concierge inquiry form & salon boutique hours
│   │   ├── dashboard/       # Protected dashboard shell & role-specific pages
│   │   │   ├── admin/       # Administrator KPIs, services, appointments, users & transactions
│   │   │   ├── customer/    # Customer bookings, status badges & Stripe payments
│   │   │   ├── profile/     # User profile editor with ImgBB avatar upload
│   │   │   └── layout.js    # Persistent role-based sidebar shell
│   │   ├── login/           # User authentication & demo evaluator quick-fill
│   │   ├── payment/         # Stripe checkout success & cancellation pages
│   │   ├── register/        # Account creation with password rules & photo upload
│   │   ├── services/        # Treatment catalog & real-time booking reservation
│   │   ├── globals.css      # Custom styling & Tailwind CSS v4 directives
│   │   ├── layout.js        # Root application layout with AuthProvider & Toaster
│   │   ├── not-found.js     # Luxury custom 404 page
│   │   └── page.js          # Editorial homepage showcasing luxury treatments
│   ├── components/          # Reusable UI components (Navbar, Footer, ServiceCard)
│   ├── context/             # React Context providers (AuthContext with JWT sync)
│   └── lib/                 # Core utilities (Better Auth, API requester, ImgBB uploader)
├── next.config.mjs          # Next.js configuration (Turbopack, image domains)
├── package.json             # Project dependencies and npm scripts
└── README.md                # Comprehensive documentation
```

---

## 📄 License

This project was built for academic and portfolio demonstration purposes as part of the Programming Hero Full-Stack Web Development curriculum.
