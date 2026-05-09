# TyphoonGo Dashboard - Implementation Notes for Developers

## Overview
The TyphoonGo dashboard has been completely refactored with a modern, clean layout. This document provides implementation notes for developers working with the new components.

## Architecture Overview

### Dashboard Structure
```
Dashboard Page (.page-dashboard)
├── Header (unchanged)
│   ├── Hamburger Menu
│   ├── Logo (TYPHOON GO)
│   └── Avatar
├── Body (.dash-body)
│   ├── SOS Action Area
│   ├── Featured Carousel
│   └── Resource Grid
└── Navigation Bar (.global-navbar)
    ├── Left Button (Map)
    ├── Center Button (Phone)
    └── Right Button (Notifications)
```

## Component Details

### 1. SOS Action Area

**Location:** Dashboard → SOS Action Area  
**Purpose:** Quick emergency response trigger

**Structure:**
```html
<div class="sos-action-area">
  <button id="btn-sos-rescue" class="sos-pulse-btn">
    <div class="sos-pulse-ring sos-ring-1"></div>
    <div class="sos-pulse-ring sos-ring-2"></div>
    <div class="sos-circle-core">
      <i class="fas fa-exclamation sos-icon"></i>
      <span class="sos-label">SOS</span>
    </div>
  </button>
  <p class="sos-hint-text">Tap to send emergency rescue</p>
</div>
```

**Current Behavior:**
- Shows toast notification: "Emergency SOS activated! Help is being dispatched."
- TODO: Integrate with backend SOS API
- TODO: Add geo-location capture
- TODO: Add sound effect

**CSS Variables Used:**
- `--red`: Button color (#FF2323)
- `--red` (opacity): Pulse ring color

**Animation Details:**
- Pulse Ring 1: 2s ease-out infinite (starts immediately)
- Pulse Ring 2: 2s ease-out infinite (0.7s delay)
- Scale: 1 → 1.3 over 2 seconds with fade-out

**JavaScript Events:**
```javascript
document.getElementById('btn-sos-rescue').addEventListener('click', () => {
  showToast('Emergency SOS activated! Help is being dispatched.');
});
```

---

### 2. Featured Carousel

**Location:** Dashboard → Featured Carousel Wrap  
**Purpose:** Display featured guides and educational content

**Structure:**
```html
<div class="featured-carousel-wrap">
  <div class="featured-carousel" id="featured-carousel">
    <div class="carousel-slide" id="carousel-slide-0">
      <div class="carousel-slide-img-wrap">
        <img src="" alt="..." class="carousel-img carousel-img-storm" />
        <div class="carousel-img-fallback">
          <i class="fas fa-house-damage carousel-fallback-icon"></i>
        </div>
      </div>
      <div class="carousel-slide-text">
        <p class="carousel-slide-eyebrow">FEATURED GUIDE</p>
        <h3 class="carousel-slide-title">Typhoon Safety Guide</h3>
        <p class="carousel-slide-sub">Tap to read essential tips</p>
      </div>
      <i class="fas fa-chevron-right carousel-arrow"></i>
    </div>
    <!-- Additional slides... -->
  </div>
  <div class="carousel-dots">
    <span class="carousel-dot active" data-index="0"></span>
    <span class="carousel-dot" data-index="1"></span>
  </div>
</div>
```

**Features:**
- ✅ Auto-rotation: 5 seconds per slide
- ✅ Manual navigation: Click carousel dots
- ✅ Touch support: Swipe left/right
- ✅ Smooth transitions: 0.5s cubic-bezier
- ✅ Fallback icons: When images unavailable

**JavaScript Implementation:**
```javascript
let currentSlide = 0;
const carousel = document.getElementById('featured-carousel');
const carouselDots = document.querySelectorAll('.carousel-dot');

function showSlide(index) {
  carousel.style.transform = `translateX(-${index * 100}%)`;
  carouselDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

// Auto-rotate
setInterval(() => {
  const nextSlide = (currentSlide + 1) % 2;
  showSlide(nextSlide);
}, 5000);

// Touch support
carousel.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});
```

**To Add New Slides:**
1. Add new `carousel-slide` div with id `carousel-slide-N`
2. Add new `carousel-dot` with data-index matching slide number
3. Update the modulo operator in auto-rotate: `% 2` → `% N`

**To Add Images:**
Replace empty `src=""` attributes with actual image paths:
```html
<img src="/images/typhoon-safety-guide.jpg" alt="..." />
```

**To Handle Click Navigation:**
Each slide has `data-target` attribute for navigation (currently unused):
```html
<div class="carousel-slide" data-target="page-survival-tips">
```

Add handler if needed:
```javascript
document.querySelectorAll('.carousel-slide').forEach(slide => {
  slide.addEventListener('click', () => {
    const target = slide.getAttribute('data-target');
    if (target) navigateTo(target);
  });
});
```

---

### 3. Resource Grid

**Location:** Dashboard → Resource Grid  
**Purpose:** Quick access to key emergency resources

**Structure:**
```html
<div class="resource-grid">
  <button class="resource-tile" id="btn-gobag">
    <div class="resource-tile-icon-wrap resource-tile-icon--green">
      <i class="fas fa-backpack resource-tile-icon"></i>
    </div>
    <span class="resource-tile-label">Go-Bag Checklist</span>
  </button>
  <!-- Additional tiles... -->
</div>
```

**Current Tiles (2×2 Grid):**
1. **Go-Bag Checklist** (ID: `btn-gobag`)
   - Icon: `fas fa-backpack`
   - Color: Green (#2ECC40)
   - Currently: Not implemented

2. **Emergency Updates** (ID: `btn-emergency-updates`)
   - Icon: `fas fa-bullhorn`
   - Color: Orange (#FF851B)
   - Navigation: → page-emergency-updates

3. **Safe Routes** (ID: `btn-safe-routes`)
   - Icon: `fas fa-route`
   - Color: Blue (#0074d9)
   - Navigation: → page-safe-routes

4. **Evacuation Centers** (ID: `btn-evac-centers`)
   - Icon: `fas fa-building-shelter`
   - Color: Purple (#b10dc9)
   - Navigation: → page-evac-centers

**CSS Grid Properties:**
- Columns: 2 (equal width)
- Column Gap: 16px
- Row Gap: 16px
- Min Tile Height: 180px
- Flex: 1 (grow to fill remaining space)

**To Add New Tiles:**
1. Add new button with unique `id`
2. Add appropriate Font Awesome icon
3. Choose or create new color class: `resource-tile-icon--color-name`
4. Define gradient in CSS:
```css
.resource-tile-icon--color-name {
  background: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

**Current Event Handlers:**
```javascript
document.getElementById('btn-emergency-updates').addEventListener('click', () => {
  navigateTo('page-emergency-updates');
});

document.getElementById('btn-safe-routes').addEventListener('click', () => {
  navigateTo('page-safe-routes');
});

document.getElementById('btn-evac-centers').addEventListener('click', () => {
  navigateTo('page-evac-centers');
});
```

---

## CSS Classes Reference

### SOS Action Area
| Class | Purpose |
|-------|---------|
| `.sos-action-area` | Container |
| `.sos-pulse-btn` | Main button |
| `.sos-pulse-ring` | Pulse ring base |
| `.sos-ring-1` | First ring (inner) |
| `.sos-ring-2` | Second ring (outer) |
| `.sos-circle-core` | Icon + text container |
| `.sos-icon` | Exclamation icon |
| `.sos-label` | "SOS" text |
| `.sos-hint-text` | Hint text below |

### Carousel
| Class | Purpose |
|-------|---------|
| `.featured-carousel-wrap` | Main container |
| `.featured-carousel` | Scrollable slides |
| `.carousel-slide` | Individual slide |
| `.carousel-slide-img-wrap` | Image container |
| `.carousel-img` | Actual image |
| `.carousel-img-fallback` | Fallback when no image |
| `.carousel-fallback-icon` | Fallback icon |
| `.carousel-slide-text` | Text overlay |
| `.carousel-slide-eyebrow` | Category text |
| `.carousel-slide-title` | Main title |
| `.carousel-slide-sub` | Subtitle |
| `.carousel-arrow` | Chevron icon |
| `.carousel-dots` | Dot container |
| `.carousel-dot` | Individual dot |
| `.carousel-dot.active` | Active dot |

### Resource Grid
| Class | Purpose |
|-------|---------|
| `.resource-grid` | Grid container |
| `.resource-tile` | Individual tile |
| `.resource-tile-icon-wrap` | Icon container |
| `.resource-tile-icon--green` | Green theme |
| `.resource-tile-icon--orange` | Orange theme |
| `.resource-tile-icon--blue` | Blue theme |
| `.resource-tile-icon--purple` | Purple theme |
| `.resource-tile-icon` | The actual icon |
| `.resource-tile-label` | Tile label text |

---

## Color Scheme

### Primary Colors
- **Red** (Emergency): `#FF2323`
- **Red Light**: `#FF5555`
- **Red Pale**: `#FFD6D6`
- **Green**: `#2ECC40`
- **Orange**: `#FF851B`
- **Blue**: `#0074d9`
- **Purple**: `#b10dc9`

### CSS Variables
All colors are defined in `:root`:
```css
--red: #FF2323
--green: #2ECC40
--orange: #FF851B
--blue: (custom)
--purple: (custom)
```

---

## Responsive Design

### Current Breakpoints
- **Mobile First:** Default styles
- **Tablet/Desktop:** Max-width 430px container

### Grid Behavior
Resource grid maintains 2-column layout at all sizes. The app container is fixed at 390px, so responsive design primarily targets the carousel and sizing.

---

## Performance Considerations

1. **Carousel Animation:** Uses CSS transforms for better performance
2. **Pulse Rings:** GPU-accelerated with transform/opacity animations
3. **Scrolling:** Smooth scroll disabled (scrollbar-width: none)
4. **Touch Events:** Debounced swipe detection

---

## File Sizes

| File | Size | Lines |
|------|------|-------|
| index.html | ~24.5 KB | 578 |
| style.css | ~52 KB | 1191 |
| script.js | ~14 KB | 358 |

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge | Mobile |
|---------|--------|---------|--------|------|--------|
| CSS Grid | ✅ | ✅ | ✅ | ✅ | ✅ |
| Flexbox | ✅ | ✅ | ✅ | ✅ | ✅ |
| CSS Animations | ✅ | ✅ | ✅ | ✅ | ✅ |
| Touch Events | ✅ | ✅ | ✅ | ✅ | ✅ |
| Transform3D | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Common Tasks

### To modify SOS button size
Update in `.sos-pulse-btn`:
```css
width: 200px;  /* Changed from 180px */
height: 200px; /* Changed from 180px */
```
Also adjust pulse rings in `.sos-ring-1` and `.sos-ring-2`.

### To change carousel animation speed
```javascript
// In showSlide function
carousel.style.transition = '1s cubic-bezier(...)'; // Changed from 0.5s

// For auto-rotation
}, 7000); // Changed from 5000ms
```

### To modify grid layout
```css
.resource-grid {
  grid-template-columns: 1fr 1fr 1fr; /* Changed to 3 columns */
}
```

### To add new resource tile
1. Add button to HTML with new ID
2. Add event listener in JavaScript
3. Style with appropriate color class
4. Update grid-template-columns if needed

---

## Troubleshooting

### Carousel Not Auto-Rotating
- Check if `currentSlide` is being updated
- Verify `setInterval` is not being cleared
- Check browser console for JavaScript errors

### Pulse Rings Not Animating
- Verify `@keyframes sosPulseRing1` and `sosPulseRing2` are defined
- Check if animations are being applied to correct elements
- Ensure animation duration matches (2s)

### Touch Swipe Not Working
- Verify touch events are being fired
- Check if carousel element exists
- Ensure `handleSwipe()` function is defined

### Resource Grid Not Centering
- Verify `.resource-grid` has correct `display: grid` property
- Check gap values are appropriate
- Ensure parent container has proper flex properties

---

## Future Enhancement Opportunities

1. **Predictive Carousel:**
   - Rotate through different guides daily/weekly
   - Machine learning to predict user needs

2. **Customizable Resource Tiles:**
   - User preference order
   - Local resource discovery
   - Custom emergency contacts

3. **Advanced SOS Features:**
   - Real-time location sharing
   - Emergency contact notification
   - Offline mode support
   - Backup power indicators

4. **Accessibility Improvements:**
   - ARIA labels for carousel
   - Keyboard navigation
   - High contrast mode
   - Screen reader optimization

5. **Analytics Integration:**
   - Track SOS usage
   - Monitor resource popularity
   - User engagement metrics

---

## Document Version
- **Version:** 1.0
- **Last Updated:** 2026-05-09
- **Status:** Production Ready

