# StoreiFly Frontend

StoreiFly is a modern, multi-tenant eCommerce platform frontend built with React 19, TypeScript, Vite, and Tailwind CSS v4. It features customer storefronts, dynamic merchant onboarding and management dashboards, and a platform administration portal.

---

### Complete Project Link : https://greatstack.dev/p/storeifly

## Key Features

### 1. Customer Storefront
* **Multi-Tenant Routing:** Dedicated store URLs based on slugs (`/store/:slug`).
* **Personalized Store Themes:** Custom accent colors and dynamic hero styles (`hero1` through `hero4`).
* **Catalog Exploration:** Product filtering by category, search with debouncing, and responsive grids.
* **Product Details:** Variant selector, stock tracking, image preview gallery, and price comparisons.
* **Shopping Cart & Checkout:** Persistent cart state, promo code support, free shipping threshold calculation, and guest or authenticated checkout.
* **Order Tracking:** Order confirmation and lookup by order number and email.

### 2. Merchant Dashboard
* **Store Setup Wizard:** Onboarding workflow to configure store identity, banner, logo, currency, shipping fees, and visual accents.
* **Product Management:** Complete catalog CRUD, variant configuration, SKU tracking, and image uploads.
* **Category Organization:** Custom product categories per store.
* **Order Management:** Real-time order fulfillment workflow (placed, processing, shipped, delivered, cancelled) and payment status toggling.
* **Store Analytics:** Metric cards for total sales, active orders, customer count, and product performance.

### 3. Platform Administration
* **Platform Overview:** High-level metrics tracking total GMV, merchant accounts, and active storefronts.
* **Store Moderation:** Platform-wide store oversight with ability to review, activate, or suspend stores.
* **Merchant Directory:** Unified view of registered merchants and their associated business details.

---

## Tech Stack

* **Framework:** React 19
* **Language:** TypeScript
* **Build Tool:** Vite 8
* **Styling:** Tailwind CSS v4
* **Icons:** Lucide React
* **Routing:** React Router v7
* **HTTP Client:** Axios
* **Notifications:** React Hot Toast
* **Linter:** Oxlint

---

## Architecture and Directory Structure

```
frontend/
├── public/               # Static assets, logos, and demo images
├── src/
│   ├── assets/           # Bundled styles and assets
│   ├── components/       # Reusable UI elements
│   │   ├── admin/        # Admin navigation and panels
│   │   ├── common/       # Shared UI (cards, inputs, badges, modals)
│   │   ├── merchant/     # Merchant sidebar, forms, layout
│   │   └── public/       # Storefront headers, hero styles, cart drawer
│   ├── config/           # API clients and routing configuration
│   ├── context/          # React contexts (AuthContext, CartContext)
│   ├── data/             # Default mock and seed data
│   ├── hooks/            # Custom reusable hooks
│   ├── pages/            # Top-level route views
│   │   ├── admin/        # Platform admin pages
│   │   ├── merchant/     # Merchant management pages
│   │   └── public/       # Consumer-facing storefront pages
│   ├── utils/            # Formatting and helper utilities
│   ├── App.tsx           # Route declarations and layout shells
│   ├── index.css         # Tailwind CSS design tokens
│   └── main.tsx          # Application entry point
├── .env.example          # Template environment configuration
├── package.json          # Project scripts and dependencies
├── tsconfig.json         # TypeScript compiler configuration
└── vite.config.ts        # Vite configuration
```

---

## Getting Started

### Prerequisites

* Node.js 18.x or higher
* npm 9.x or higher (or pnpm / yarn)

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/your-username/storeifly-frontend.git
   cd storeifly-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Configure your `.env` values (see [Configuration](#configuration)).

5. Start the local development server:
   ```bash
   npm run dev
   ```

The application will be accessible at `http://localhost:5173`.

---

## Configuration

The frontend relies on the following environment variables:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_BASE_URL` | Base URL of the StoreiFly backend API | `http://localhost:3000` |
| `VITE_NEON_AUTH_URL` | (Optional) URL for Neon Auth endpoint | - |
| `VITE_NEON_FUNCTIONS_URL` | (Optional) Edge compute function URL for public product reads | - |

---

## Available Scripts

* `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
* `npm run build`: Type-checks the project using TypeScript and builds the production bundle in `dist/`.
* `npm run preview`: Locally previews the production build.
* `npm run lint`: Runs Oxlint for fast static analysis.

---

## API Integration

Network requests are managed via an Axios instance located at `src/config/api.ts`.
* Automatic `Authorization: Bearer <token>` header injection for authenticated merchant and admin requests.
* Optional edge routing: when `VITE_NEON_FUNCTIONS_URL` is set, public read operations (`/api/products`, `/api/stores/slug/*`, `/api/stores/public/featured`) route directly to serverless edge compute for low-latency responses.

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on code style, branch naming conventions, and the pull request process.

---

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.
