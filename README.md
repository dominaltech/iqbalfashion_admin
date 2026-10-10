# Iqbal Fashion — Admin & Operations Portal (PWA)

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Standalone%20Deployment-black?style=flat&logo=vercel)](https://github.com/dominaltech/iqbalfashion_admin)
[![Database: Supabase](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E?style=flat&logo=supabase)](https://supabase.com)
[![PWA](https://img.shields.io/badge/PWA-Push%20Notifications%20Ready-blueviolet?style=flat)](manifest.json)

Standalone administrative management portal and Progressive Web Application (PWA) for **Iqbal Fashion**. Built for seamless store operations, live order processing, hierarchical category management, product catalog control, hero banner scheduling, discount coupons, and Web Push notifications.

---

## 🚀 Key Modules & Capabilities

1. **Dashboard & Analytics (`index.html`)**
   - High-level KPIs: Total Revenue, Live Orders, Active Products, Registered Customers.
   - Quick navigation to all administrative workflows.

2. **Order Management & Fulfillment (`orders.html`)**
   - Real-time Supabase postgres change listener (`orders` table).
   - Instant order notification sound + visual badge alerts.
   - Complete lifecycle tracking: `PENDING` ➔ `CONFIRMED` ➔ `PROCESSING` ➔ `SHIPPED` ➔ `DELIVERED` / `CANCELLED`.
   - Printable customer invoices with delivery addresses and order itemization.

3. **Hierarchical Categories & Collections (`categories.html`)**
   - Unlimited parent-child category nesting (e.g. `Readymade ➔ Shirts`, `Cloth Material ➔ Suiting / Linen`).
   - Dynamic parent selector dropdown with root category option.
   - Direct category image thumbnail upload to Supabase Storage (`categories` bucket).
   - Target storefront page link generator (supports renamed routes e.g. `readymade.html`, `cloth-material.html`).
   - Delete protection: Safely prevents deleting parent categories that have active child subcategories or assigned products.

4. **Product Catalog Manager (`add-product.html`, `all-products.html`)**
   - Multi-image uploads directly to Supabase Storage.
   - Dynamic cascading Category ➔ Subcategory pickers.
   - Size presets (S, M, L, XL, XXL, Free Size, Meter lengths for fabrics).
   - Stock and inventory management, pricing, sale discounts, and rich descriptions.

5. **Hero Banner & Campaign Scheduler (`add-banner.html`)**
   - Manage promotional sliders and banners displayed on the customer storefront.
   - Target URL assignment for immediate flash sales.

6. **Promotions & Coupons (`coupons.html`)**
   - Percentage-off and flat discount codes with minimum order limits and expiry dates.

7. **Bulk CSV Upload (`bulk-upload.html`)**
   - Fast catalog onboarding via CSV spreadsheets.

8. **Sizes Preset & Store Settings (`sizes.html`)**
   - Custom size tags tailored for both bespoke fabric measurements and ready-made garments.

9. **Customer Accounts (`users.html`)**
   - View registered users and customer order history.

10. **Native PWA & Push Notifications (`manifest.json`, `sw.js`)**
    - Installable on mobile (Android/iOS) and desktop (Chrome/Edge/macOS) as a standalone app.
    - Web Push integration via VAPID keys: Receives instant push notifications even when the browser is closed.

---

## 🛠️ Technology Stack

- **Frontend:** Vanilla HTML5, CSS3, Modern JavaScript (ES6+), FontAwesome Icons.
- **Backend / Database:** Supabase (PostgreSQL with Realtime replication, Row-Level Security, Auth, and Storage).
- **Service Worker / PWA:** Standalone scope (`/`), cache-first UI, background Push event listeners.
- **Hosting:** Vercel (Independent static zero-config hosting).

---

## 📦 Vercel Deployment Guide

This repository is designed to be deployed as a **standalone Vercel project**, completely independent of the customer storefront.

### 1. Connect Repository
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** ➔ **Project**.
3. Import the `https://github.com/dominaltech/iqbalfashion_admin` repository.
4. **Framework Preset:** Other / None (Static).
5. **Root Directory:** `./` (Leave as root).

### 2. Configure Environment Variables
Under the **Environment Variables** section in Vercel settings, configure:

| Variable Name | Description | Default Fallback (in config.js) |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | `https://yimbuvqtlbqdfggthaqt.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anonymous Key | Configured in `config.js` |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Web Push VAPID Public Key | `BF3kSJsLXqbdtvzEQew...` |
| `VAPID_SUBJECT` | Web Push Contact Email | `mailto:iqbalfashiongents@gmail.com` |

### 3. Deploy
Click **Deploy**. Vercel will deploy the portal instantly at `https://iqbalfashion-admin.vercel.app` (or your custom domain).

---

## 🗄️ Supabase Database Setup

All database migrations and setup scripts are located in:
```
supabase/migrations_iqbal_proposed/
├── 01_iqbal_core_schema_and_permissions.sql
├── 02_iqbal_hierarchical_categories_and_links.sql
├── 03_iqbal_seed_initial_categories_and_banners.sql
├── 04_iqbal_realtime_and_push_triggers.sql
└── 05_iqbal_update_legacy_page_urls.sql
```

Execute these in order in your **Supabase Dashboard ➔ SQL Editor** to initialize or update the database tables, triggers, and storage buckets (`products`, `categories`, `banners`).

---

## 🔒 Security Best Practices

- `config.js` never contains secret keys (e.g., Supabase `service_role` key or VAPID `privateKey`).
- Payment gateway secrets and private keys are strictly managed via serverless API routes or environment variables.
- RLS (Row-Level Security) policies protect sensitive customer records.
