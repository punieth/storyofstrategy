# Product Requirements Document (PRD): Proof-it

**Version:** 2.0 (Prototype Refined)
**Status:** Implementation Complete / Prototype Phase
**Source of Truth:** Proof-it Prototype (`proofit-credibility-hub`)

---

## 1. Executive Summary
**Proof-it** is a high-fidelity "Credibility Hub" designed for local service businesses (Printers, Caterers, Fabricators, etc.) to build instant trust with corporate and bulk buyers. By combining official GST verification, a frictionless "Vouch" system, and professional sales enablement tools, Proof-it bridges the trust gap in the fragmented local B2B service market.

---

## 2. The Problem
Local businesses often lose high-value deals because:
1.  **Trust Gap:** New clients (especially corporate) fear unprofessionalism or lack of legitimacy.
2.  **Friction in Reviews:** Getting customers to leave Google reviews is hard; verifying them is harder.
3.  **Sales Delay:** Manually calculating and sharing quotes for standard services slows down the "intent-to-purchase" window.

---

## 3. The Solution (Key Features)

### 3.1. Verified Business Profile (The "Digital Storefront")
A premium, mobile-optimized public profile that serves as the single source of truth for a business.
*   **GST Verification:** Real-time (simulated) query of the official GST network to assign a "Verified" badge.
*   **Polaroid Portfolio:** A visual-first gallery showcasing real-world project samples with a premium aesthetic (Polaroid-style cards with hover animations).
*   **Transparent Pricing:** A structured service catalog with unit-based rates (e.g., ₹25/piece for brochures).
*   **Rating Summary:** A detailed bar-chart breakdown of reviews (5-star to 1-star) to provide nuanced social proof.

### 3.2. Credibility Engine (The "Vouch" System)
A low-friction review collection flow optimized for WhatsApp-based sharing, demoed via high-fidelity smartphone mockups.
*   **No-Login Reviewing:** Customers can leave a review in under 30 seconds without an account.
*   **3-Step Flow:** Star Rating → Sentiment ("Would you work again?") → Micro-comment (100 chars).
*   **Anonymity Toggle:** Users can choose to "Show my name" or remain anonymous to increase participation rates.
*   **Verification Badge:** Reviews are tagged as "Verified" if they come through the vendor's direct request link.

### 3.3. Sales Enablement (Instant Quote Generator)
An interactive tool that turns profile visitors into leads instantly.
*   **Cart Experience:** Buyers can select multiple services and adjust quantities using a stepper.
*   **Dynamic Calculations:** Automated subtotal and 18% GST calculation.
*   **Premium Invoice Preview:** A skeuomorphic digital quote that mimics a physical paper invoice, complete with a "noise" texture, paper-top border, and "VERIFIED" watermark.
*   **Share & Save:** Ability to generate a shareable link or "Save" the quote locally.

### 3.4. Vendor Dashboard (Insights & Management)
*   **Buyer Metrics:** Tracking four key KPIs: **Views, Quote Opens, Profile Shares, and Repeat Visits.**
*   **Time-Series Filtering:** Toggle views between Today, 7 Days, 30 Days, and Lifetime.
*   **Activity Feed:** Real-time log of buyer interactions (e.g., "Someone viewed your profile via QR code").
*   **Profile Control:** Quick-edit toggles for Auto-verify, Vouch mode, and Email alerts.

---

## 4. User Flows

### 4.1. Vendor Onboarding
1.  **Step 1: Identity:** Basic business details (Name, Category, Location) and phone number.
2.  **Step 2: Verification:** Input 15-digit GSTIN for automated registry verification (simulated scanning animation).
3.  **Step 3: Portfolio:** Upload hero images and captions of previous work samples.
4.  **Step 4: Launch:** Profile goes live with a unique `proofit.in/business-name` URL and a success animation.

### 4.2. Buyer Interaction
1.  **Discovery:** Buyer lands on the profile via QR code or shared link.
2.  **Verification:** Buyer sees the "GST Verified" badge and recent customer vouches.
3.  **Quoting:** Buyer selects services, sees the professional invoice preview, and either calls the vendor or saves the quote.

---

## 5. Design & Tech Stack
*   **Design System:** 
    *   **Typography:** *Outfit* (Headlines) for a modern B2B feel; *Inter* (Body) for high legibility.
    *   **Palette:** Deep Zinc (#09090b) for authority, Saffron (#ff6b00) for local brand energy.
    *   **Aesthetics:** "Skeuomorphic Minimalist" — using shadows, textures, and subtle animations (like the "scan" line during verification) to feel premium.
*   **Tech Stack:** React (Vite), TanStack Router (File-based routing), Lucide Icons, Sonner (Notifications), Tailwind CSS (Base layer).

---

## 6. Business Value
*   **For Vendors:** 2x faster trust building, 0% commission on leads, professional digital presence.
*   **For Buyers:** Peace of mind via government verification, instant pricing clarity, and social proof.
