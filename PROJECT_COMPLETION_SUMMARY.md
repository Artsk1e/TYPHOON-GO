# Typhoon GO — Project Completion Document

**Version:** 1.0.0 — Core Feature Complete  
**Date:** May 11, 2026  
**Author:** Artsk1e  
**Repository Branch:** `main`  
**Architecture:** Single Page Application (SPA) — Vanilla HTML5 / CSS3 / JavaScript (ES6+)

---

## 1. Executive Summary

**Typhoon GO** is a mobile-first progressive web application (PWA-adjacent) engineered for typhoon and general disaster readiness in the Philippine context. The application is designed to be a single, self-contained resource that a citizen can open on their smartphone during — or in preparation for — a typhoon event. It consolidates emergency contact management, crisis communication via a messaging interface, a gamified disaster preparedness go-bag checklist, real-time safe route mapping, evacuation center lookup, typhoon safety tips, and first aid guidance into a single, zero-dependency (no heavy frameworks), offline-capable shell.

The application is specifically calibrated for low-bandwidth, high-stress usage scenarios: it uses no external API calls for core functionality (maps excepted via Leaflet/OpenStreetMap), is fully rendered client-side, and employs an SPA architecture so that the entire application is delivered in a single HTTP load — critical in network-degraded disaster conditions.

The primary target platform is the Philippine mobile ecosystem (iOS Safari/WebKit and Android Chrome), constrained to a `390px × 844px` phone viewport (mirroring the iPhone 14 reference frame), with full responsiveness down to `100vw` on any device narrower than `430px`.

---

## 2. Core Features

### 2.1 Authentication Flow

The application opens on a **Login page** (`#page-login`) featuring the branded red wave SVG header — a two-layer SVG path gradient effect that creates an organic wave transition between the brand's red header and the white form body. The flow supports:

- **Login** (`#btn-login`) — navigates to the Dashboard. In production, this wires to a backend authentication endpoint.
- **Forgot Password** (`#page-forgot`) — a dedicated sub-page with email, new password, and confirm password fields. Client-side validation is enforced via `showToast()` before any navigation occurs: it checks for empty email, minimum 6-character password length, and password confirmation match.
- **Registration** (`#page-register`) — collects email, password, first name, last name, phone number, and address. The phone field feeds into the `+63` prefix logic handled server-side in the contact object construction.

All form inputs share the `.field-input` class: `52px` tall, `border-radius: 30px`, `background: var(--input-bg)` (`#D9D9D9`), and a `box-shadow`-based focus ring (`0 0 0 2.5px var(--red)`) to avoid layout jitter.

### 2.2 Dashboard (`#page-dashboard`)

The Dashboard is the primary hub of the application. It is structured in a vertical flex column with a sticky header, a scrollable body (`.dash-body`), and a fixed bottom global navigation bar.

**Components on the Dashboard:**

- **Sticky Header (`.dash-header`):** A three-element flex row (`header-spacer` / centered logo / `header-action-btn`). The action button navigates to `#page-recent-messages`. The spacer and action button are both given a fixed `width: 40px` to enforce optical centering of the logo — a deliberate layout decision to prevent the logo from shifting depending on icon presence.
- **Weather Banner (`.weather-banner`):** A `150px`-tall full-width image (`weatherbanner.png`) with `object-fit: cover`, `border-radius: 18px`, and a negative top margin (`margin-top: -50px`) to bleed into the header boundary, creating an immersive banner effect.
- **SOS Circle Button (`.sos-circle-outer`):** The central interactive element. A `250px × 250px` red circle with a white inner circle (`190px × 190px`) housing a FontAwesome `fa-hand-paper` icon at `80px`. The outer ring has a continuous CSS pulse animation (`@keyframes sosPulse`) that alternates `box-shadow` intensity to simulate an emergency pulsation. On click, triggers `showToast('Emergency SOS activated! Help is being dispatched.')`.
- **Featured Carousel (`.featured-carousel`):** A horizontally scrolling, snap-scrolling two-slide carousel. Slides are navigated via dot controls (`.carousel-dot`), touch swipe events, and auto-rotation on a `5000ms` interval. Each slide is a full `.carousel-slide-btn` element (a `<button>`) that navigates to a target page via `data-target`. The carousel uses `scroll-snap-type: x mandatory` for native browser snapping.
- **Resource Grid (`.resource-grid`):** A `2×2` CSS Grid below the carousel linking to: Evacuation Centers (`#page-evac-centers`), Safe Routes (`#page-safe-routes`), and Emergency Updates (`#page-emergency-updates`). Each tile (`.resource-tile`) is `300px` tall with an image header block and text below, with a `transform: scale(0.95)` active state for tactile press feedback.

### 2.3 Contact Management (`#page-contacts`)

The Contacts page is the emergency communication hub. Its layout is:

1. **Recent Calls Horizontal Carousel (`.recent-calls-carousel`):** A horizontally scrolling row of avatar cards (`.recent-call-card`), each `80px` wide with a `56px` circle avatar, contact name, and relative timestamp. Clicking a card uses event delegation (bubbled to `DOMContentLoaded` listener) to extract `data-contact` name and avatar color, then navigates to the messaging view with that contact's context pre-loaded.

2. **Contact List (`.contact-list`):** An alphabetically-divided list of contacts. Each row (`.contact-row`) contains: a colored avatar circle (`.contact-avatar`), name and relationship label, and two action buttons — a green phone call button (`.contact-call`) and a blue SMS button (`.contact-sms`). The SMS button carries a `data-contact` attribute that the messaging router reads.

3. **Add Contact FAB (`.btn-add-contact`):** A floating action button anchored `bottom: 90px; right: 20px` (above the navbar), colored in brand red with a red glow `box-shadow`. Clicking opens a `.modal-overlay` (`.active` class toggles `display: flex`) containing a modal form (`#add-contact-form`) with name and phone fields. On submission, the `+63` country code is prepended in JavaScript: `phone: '+63' + phone`, keeping the UI input clean while constructing the fully-qualified phone number in the data layer. A new card is also injected into the recent calls carousel via `addContactToCarousel()` with a randomly assigned avatar color from a curated palette.

### 2.4 Go-Bag Checklist (`#page-gobag`)

A gamified emergency preparedness checklist with 15 categorized items. The feature is encapsulated in an IIFE (`initGoBagChecklist`) for scope isolation.

**Mechanics:**
- A live progress bar (`.progress-bar-fill`) updates in real time via inline `style.width` assignment, animated with `cubic-bezier(0.34, 1.56, 0.64, 1)` for a springy overshoot effect.
- A percentage label (`#gobag-percent`) and item counter (`#gobag-items-count`) update on every checkbox `change` event.
- A status label (`.gobag-status-label`) transitions through four states: *Not Started* → *In Progress* (orange dot) → *Almost Ready!* (green dot) → *Fully Packed!* (red pulsing dot via `@keyframes statusPulse`).
- **Milestone System:** At 25%, 50%, 75%, and 100% packing completion, a milestone overlay (`.gobag-milestone-overlay`) appears with an emoji icon, title, and motivational message, rendered in a pop-scale card animation (`@keyframes milestonePop`). A de-bounce guard (`triggered` object) ensures each milestone fires only once per ascending pass, and resets when the user un-checks below a threshold.
- Checked items receive an `.item-checked` class that applies `opacity: 0.45` and `text-decoration: line-through` to the item label, providing clear visual completion feedback.
- A banner image (`.checklist-image`) bleeds slightly beyond its container (`width: 105%; margin-left: -5px`) for a card-edge-to-edge visual effect.

### 2.5 Messaging System (`#page-message`)

A full in-app direct messaging interface designed to replicate the UX of native mobile messaging apps.

**Features:**
- **Dynamic Contact Header:** When navigated to from any contact (via SMS button or recent call card), the header avatar (`#msg-header-avatar`), header name (`#msg-header-name`), empty-state avatar (`#msg-empty-avatar`), and empty-state name (`#msg-empty-name`) are all programmatically updated from the source contact's `data-contact` attribute and avatar `backgroundColor` style. The initial letter is derived via `.charAt(0).toUpperCase()`.
- **Empty State:** On first load (or after contact switch), an empty state with a large faded avatar and "Say hello to [Contact]!" prompt is displayed. It is hidden on the first message send.
- **Quick Chat Buttons (`.msg-quick-btn`):** Four pre-composed disaster-context messages: *"I am safe."*, *"Help needed here!"* (marked `.msg-quick-urgent`, styled red), *"What's the status?"*, and *"Sending my location..."*. Each injects a chat bubble directly via `addMessage()`.
- **Chat Bubbles:** Outgoing messages appear right-aligned in brand red (`var(--red)`). Urgent messages render in deep red (`#8B0000`). Incoming messages (future use) are left-aligned, white with a border. Both bubble types have asymmetric `border-radius` (one corner at `4px`) to replicate native messaging tail styles.
- **Input Footer (`.msg-footer`):** A `flex-shrink: 0` fixed footer containing: utility buttons (attach, camera, gallery, microphone), a pill-shaped text input wrapper (`.msg-input-wrap`), an emoji button, and a red circular send button. The footer uses a flex layout on the `.page` itself combined with `overflow: hidden` on `#page-message` to ensure the footer remains pinned without using `position: fixed` or `100vh` calculations — the correct architectural solution for mobile WebKit sticky footer bugs.
- **Dropdown Menu:** A `⋮` button (`#msg-menu-toggle`) reveals a context menu with options: Details, Archive, Delete Conversation, Block and report spam (styled danger red), and Help and feedback. The dropdown is dismissed on any document-level click via a separate event listener with `stopPropagation()` guarding the toggle button.
- **Recent Messages List (`#page-recent-messages`):** An overview page showing previous conversations as cards with avatar, name, timestamp, and message preview (truncated via `text-overflow: ellipsis`).

### 2.6 Leaflet Map Integration (`#page-safe-routes`)

The Safe Routes page embeds a full interactive map via the **Leaflet.js** library (v1.9.4) with **OpenStreetMap** tiles.

- The map is initialized lazily — only when the user first navigates to `#page-safe-routes` — via a `100ms setTimeout` guard to ensure the DOM container (`#map-container`) is fully painted before Leaflet attempts to measure it.
- Default center: **MSU-IIT, Iligan City, Lanao del Norte, Philippines** (`[8.2411, 124.2439]`), zoom level `15`.
- A marker is placed at the same coordinates with a popup: *"MSU-IIT — Iligan City, Lanao del Norte."*
- On subsequent visits to the page (if the map is already initialized), `map.invalidateSize()` is called instead of re-initializing, preventing tile rendering artifacts from stale container dimensions.
- Below the map, **route cards** (`.route-card`) list named evacuation routes with colored status indicators: green border + `.safe-label` for passable routes, red border + `.flooded-label` for flooded routes.
- A destination selector card (`.destination-card`) provides a collapsible dropdown of pre-defined evacuation centers, toggled via a chevron icon that rotates `180deg` (`.dest-chevron.open`) when open. Selecting a destination reveals a travel info card with walking, driving, and other mode estimates.

### 2.7 Supporting Information Pages

- **Evacuation Centers (`#page-evac-centers`):** A searchable list of barangay evacuation centers with capacity status dots (green/orange/red with a `✓` checkmark pseudo-element).
- **Emergency Updates (`#page-emergency-updates`):** Time-stamped alert cards with real-time search filtering via `input` event listeners on `#alert-search`.
- **Typhoon Safety Tips (`#page-typhoon-tips`):** Categorized pre/during/post-typhoon safety advice rendered as a styled article with section dividers.
- **First Aid & Survival Guide (`#page-first-aid`):** CPR, wound care, and emergency medical guidance in a consistent article layout.
- **Account Page (`#page-account`):** User profile display (avatar, name, email) with a settings menu and logout button that triggers `showToast` before navigating back to login.

---

## 3. Technology Stack

| Layer | Technology | Version | Role |
|---|---|---|---|
| Markup | HTML5 | — | SPA shell, semantic page sections |
| Styling | CSS3 (Custom Properties, Grid, Flexbox) | — | All layout, theming, animation |
| Scripting | Vanilla JavaScript (ES6+, `'use strict'`) | — | Routing, DOM manipulation, event handling |
| Typography | Nunito (Google Fonts) | — | Primary UI font (weights 400–900) |
| Iconography | Font Awesome | 6.4.0 | All UI icons (nav, action, utility) |
| Mapping | Leaflet.js | 1.9.4 | Interactive OpenStreetMap-backed map |
| Map Tiles | OpenStreetMap | — | Free, open-source tile provider |
| Viewport Meta | `maximum-scale=1.0, user-scalable=no` | — | Prevents iOS double-tap zoom |
| Layout Units | `dvh` (Dynamic Viewport Height) | — | Correct mobile viewport on iOS Safari |
| Build System | None | — | Zero-build, single-file delivery |
| Package Manager | None | — | All dependencies via CDN |

### 3.1 Architectural Constraints and Deliberate Choices

- **No framework dependency:** React, Vue, and Angular were deliberately excluded. The entire application runs from three files (`index.html`, `style.css`, `script.js`), making it deployable to any static host including GitHub Pages, Netlify, or a simple NGINX server.
- **SPA via CSS `display` toggling:** Pages are not separate HTML files. All pages exist simultaneously in the DOM and are shown/hidden via `.active` class and `display: flex` / `display: none` transitions. This eliminates all network round-trips during in-app navigation.
- **`dvh` units over `vh`:** The app wrapper uses `max-height: 100dvh` and the mobile breakpoint uses `height: 100dvh` to correctly account for the dynamic toolbar height in iOS Safari — the canonical fix for the "100vh is too tall" mobile bug.
- **CDN delivery:** Leaflet, Font Awesome, and Nunito are loaded from public CDNs (`unpkg.com`, `cdnjs.cloudflare.com`, `fonts.googleapis.com`), keeping the local asset footprint minimal.