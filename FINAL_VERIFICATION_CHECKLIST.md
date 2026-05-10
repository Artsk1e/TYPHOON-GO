# Typhoon GO — Final Verification Checklist

**Version:** 1.0.0  
**To be completed by:** QA Engineer / Lead Developer  
**Target Devices:** iOS Safari (iPhone 13/14/15), Android Chrome (Pixel, Samsung Galaxy)  
**Desktop Verification:** Chrome 120+, Firefox 120+, Safari 17+

Mark each item: ✅ Pass | ❌ Fail | ⚠️ Partial | N/A

---

## Section 1: Application Shell & Responsive Layout

- [ ] On desktop (>430px wide), `#app-wrapper` renders at exactly `390px` wide and `844px` tall, centered horizontally with a visible `box-shadow`.
- [ ] On mobile (≤430px wide), `#app-wrapper` fills `100vw` and `100dvh` exactly — no horizontal overflow, no excess white space below the app.
- [ ] On iOS Safari with the browser toolbar visible, the app does not overflow below the fold. (`dvh` unit is working correctly.)
- [ ] On iOS Safari with the browser toolbar hidden (scrolled), the app correctly fills the expanded viewport.
- [ ] No horizontal scrollbar is visible on any page on any viewport width.
- [ ] The app background color (`#e8e8e8`) is visible on desktop alongside the constrained app wrapper. On mobile, the page background (`#fffefe`) fills the full screen.
- [ ] All scrollable page bodies (`.inner-body`, `.dash-body`, `.msg-body`) show no visible scrollbar on iOS or Android (`::-webkit-scrollbar { display: none }` is effective).

---

## Section 2: SPA Routing & Navigation

- [ ] On page load, only `#page-login` is visible. All other pages are hidden.
- [ ] Clicking "Log in" navigates to `#page-dashboard` with the `slideIn` animation (content slides in from the right, `0.28s` duration).
- [ ] The `slideIn` class is removed from the page element after the animation completes (no stale animation classes in DOM).
- [ ] Clicking "Create New Account" navigates to `#page-register`.
- [ ] Clicking "Forgot Password?" navigates to `#page-forgot`.
- [ ] All back buttons (←) navigate to the correct parent page as specified by their `data-target` attributes.
- [ ] Clicking a back button on `#page-forgot` returns to `#page-login`. The forgot-password form fields are not cleared (expected — no reset on navigation by design).
- [ ] Navigating to the same page that is already active does nothing (no duplicate `.active` classes, no scroll reset).
- [ ] After logout (`#btn-logout`), the app navigates to `#page-login` after the 1200ms toast delay.
- [ ] All `data-target` nav buttons in the global navbar navigate correctly:
  - Home → `#page-dashboard`
  - Map → `#page-safe-routes`
  - Call → `#page-contacts`
  - Account → `#page-account`
- [ ] Each page opens scrolled to the top (`scrollTop = 0`).

---

## Section 3: Global Navbar Active State

- [ ] When on `#page-dashboard`, the "Home" nav button has the `.nav-active` class (text color `var(--red)`).
- [ ] When on `#page-safe-routes`, the "Map" nav button has `.nav-active`.
- [ ] When on `#page-contacts`, the "Call" nav button has `.nav-active`.
- [ ] When on `#page-account`, the "Account" nav button has `.nav-active`.
- [ ] When navigating from one page to another, the previous active tab loses `.nav-active` before the new one gains it — no two tabs are simultaneously active.
- [ ] Sub-pages without navbar items (e.g., `#page-message`, `#page-gobag`) do not cause any navbar button to become unexpectedly active.
- [ ] Pages with `.has-navbar` class have sufficient `padding-bottom: 70px` so content is not obscured by the navbar on any device.

---

## Section 4: Active State Animations (Transform: Scale)

Verify on a physical touch device — not just mouse click — as `:active` behavior differs.

- [ ] `.btn-primary:active` — scales to `0.97`, background darkens to `#e01c1c`. Snaps back immediately on release.
- [ ] `.btn-outline:active` — scales to `0.97`, background changes to `#fff5f5`.
- [ ] `.sos-circle-outer:active` — scales to `0.95`.
- [ ] `.resource-tile:active` — scales to `0.95`, a dark overlay (`rgba(0,0,0,0.05)`) appears via `::before` pseudo-element.
- [ ] `.btn-add-contact:active` — scales to `0.95`.
- [ ] `.btn-add-contact:hover` (desktop) — scales to `1.1`, box-shadow intensifies.
- [ ] `.carousel-dot:active` — scales to `1.1`.
- [ ] `.carousel-dot.active` — scales to `1.3`, background is `var(--red)`.
- [ ] `.carousel-slide:active` and `.carousel-slide-btn:active` — scale to `0.98`.
- [ ] `.sos-circle-outer` — the `sosPulse` animation is continuously running on page load (alternating box-shadow intensity every 2.4 seconds).
- [ ] `.gobag-milestone-btn:active` — scales to `0.96`.
- [ ] `.header-action-btn:active` — scales to `0.9`, icon opacity reduces to `0.8`.

---

## Section 5: Form Validation

### Login Page
- [ ] Clicking "Log in" with both fields empty navigates to Dashboard (no validation enforced at login — by design for prototype).
- [ ] "Forgot Password?" link navigates to `#page-forgot`.

### Forgot Password Page
- [ ] Clicking "Reset Password" with empty email field shows red toast: *"Please enter your email."*
- [ ] Clicking "Reset Password" with email filled but password shorter than 6 characters shows: *"Password must be at least 6 characters."*
- [ ] Clicking "Reset Password" with mismatching passwords shows: *"Passwords do not match."*
- [ ] Clicking "Reset Password" with valid email, matching passwords of 6+ characters shows green toast: *"Password reset successful!"* and navigates to `#page-login` after 1200ms.

### Add Contact Modal
- [ ] Clicking the FAB (`+`) button opens the modal overlay with fade-in.
- [ ] Clicking outside the modal container (on the overlay backdrop) closes the modal.
- [ ] Clicking "×" closes the modal.
- [ ] Submitting the form with an empty name field shows toast: *"Please fill in all fields."*
- [ ] Submitting the form with an empty phone field shows toast: *"Please fill in all fields."*
- [ ] Submitting with both fields filled shows green toast: *"Contact '[Name]' added successfully!"*
- [ ] After successful submission, the modal closes and a new card appears at the front of the Recent Calls carousel.
- [ ] The new contact's phone number in the data object is prefixed with `+63` (verifiable via console log or breakpoint).

---

## Section 6: Dashboard

- [ ] Weather banner image loads and renders at `150px` height with `border-radius: 18px`.
- [ ] If `weatherbanner.png` is missing, the broken image placeholder does not break the layout.
- [ ] SOS button is centered horizontally, `250px × 250px`, with pulsing animation visible.
- [ ] Tapping SOS button shows toast: *"Emergency SOS activated! Help is being dispatched."*
- [ ] Carousel is `220px` tall, fully visible, with rounded corners.
- [ ] Both carousel slides are at the same vertical position — no staggering.
- [ ] Carousel dots are visible below the carousel. Inactive dots are `var(--light-gray)`; active dot is red.
- [ ] Clicking a carousel dot jumps to the corresponding slide.
- [ ] Swiping left/right on the carousel advances/retreats one slide.
- [ ] After 5 seconds of inactivity, the carousel auto-advances to the next slide.
- [ ] Carousel slides with `data-target` navigate to the correct page on click.
- [ ] Resource grid renders as 2 columns. All four tiles are at the same height (`300px`).
- [ ] Each resource tile scales to `0.95` on press and navigates to the correct page.

---

## Section 7: Messaging System

- [ ] Tapping the SMS button on a contact opens `#page-message` with that contact's name in the header.
- [ ] The header avatar shows the first letter of the contact's name with the correct background color from the contact row.
- [ ] The empty state avatar and "Say hello to [Name]!" text reflect the correct contact.
- [ ] Tapping a Recent Call card opens `#page-message` with that contact's context loaded.
- [ ] Switching contacts resets the chat list (no previous messages visible) and shows the empty state again.
- [ ] Typing a message and tapping the send button appends a red outgoing bubble, right-aligned.
- [ ] Pressing Enter in the input field sends the message.
- [ ] After the first message is sent, the empty state and quick chat buttons are hidden.
- [ ] Tapping "I am safe. ✅" sends a normal red bubble.
- [ ] Tapping "Help needed here! 🚨" sends a dark red (`#8B0000`) urgent bubble.
- [ ] The chat list auto-scrolls to the bottom after each new message.
- [ ] The message footer remains visible and does not slip under the keyboard on iOS Safari.
- [ ] The ⋮ menu toggle opens a dropdown with 5 items.
- [ ] Clicking anywhere outside the dropdown closes it.
- [ ] The message input does not have a visible border within `.msg-input-wrap` (it is border-free and transparent inside the pill wrapper).

---

## Section 8: Go-Bag Checklist

- [ ] Progress bar starts at `0%`, status label shows "Not Started".
- [ ] Checking any item increments the progress bar and percentage label.
- [ ] Checking items updates the item count text: `X / 15 items packed`.
- [ ] At 25% packing, milestone overlay appears with 🎒 icon and correct message.
- [ ] At 50%, 75%, and 100%, corresponding milestone overlays appear.
- [ ] Milestone popup can be dismissed by clicking "Got it!" button.
- [ ] Un-checking an item below a milestone threshold resets that milestone's trigger (it will fire again if the threshold is re-crossed).
- [ ] At 100%, the status label shows "✓ Fully Packed!" with a red pulsing dot.
- [ ] Checked items are visually dimmed (`opacity: 0.45`) and show strikethrough text.
- [ ] Checkbox check animation (scale pop) plays on each check action.

---

## Section 9: Leaflet Map

- [ ] Navigating to `#page-safe-routes` for the first time initializes the map within ~100ms.
- [ ] Map tiles load from OpenStreetMap and cover the container area.
- [ ] Map is centered on Iligan City, Philippines at zoom level 15.
- [ ] A marker is present at MSU-IIT coordinates.
- [ ] The popup "MSU-IIT — Iligan City, Lanao del Norte." auto-opens.
- [ ] Map is interactive: pinch-to-zoom, pan gestures work on touch devices.
- [ ] Navigating away and back to `#page-safe-routes` does not create a second map instance — `invalidateSize()` is called instead.
- [ ] After `invalidateSize()`, tiles render correctly without blank gray areas.
- [ ] Route cards (safe/flooded) display below the map with correct colored borders.
- [ ] Destination dropdown opens and closes with the chevron rotation animation.
- [ ] Selecting a destination shows the travel info card.

---

## Section 10: Toast Notification System

- [ ] Error toasts appear in red (`#FF2323`), success toasts in green (`#2ECC40`).
- [ ] Toast appears at `bottom: 90px`, centered horizontally within `#app-wrapper`.
- [ ] Only one toast is visible at a time — rapid consecutive triggers replace the previous toast.
- [ ] Toast fades out after ~2200ms.
- [ ] Toast does not intercept touch/click events while visible (`pointer-events: none`).
- [ ] On desktop, toast is constrained within the `390px` app wrapper (not spanning full browser width).

---

## Section 11: Cross-Browser & Accessibility

- [ ] `-webkit-tap-highlight-color: transparent` eliminates blue tap flashes on all tappable elements on iOS.
- [ ] `touch-action: manipulation` on all `<button>` elements prevents 300ms tap delay on older Android.
- [ ] `user-scalable=no, maximum-scale=1.0` in viewport meta prevents unintentional pinch zoom.
- [ ] All interactive elements are reachable via keyboard Tab navigation (desktop QA).
- [ ] Color contrast between `--red` (`#FF2323`) and white meets WCAG AA for large text (buttons, labels).
- [ ] App renders without JavaScript errors in browser DevTools console on fresh load.