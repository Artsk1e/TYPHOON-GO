# TyphoonGo Dashboard - Quick Reference Guide

## 📍 Dashboard Layout Map

```
┌────────────────────────────────────────────┐
│              DASHBOARD HEADER              │
│  ☰ Menu    TYPHOON GO    👤 Avatar        │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │  SOS ACTION AREA                     │  │
│  │                                      │  │
│  │      ◯ ◯  Pulse Rings               │  │
│  │        ⊖ ! ⊖                        │  │  ← 180px button
│  │          SOS                        │  │
│  │  Tap to send emergency rescue       │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │  FEATURED CAROUSEL                   │  │
│  │──────────────────────────────────────│  │
│  │ [IMAGE] Title                    →   │  │ ← 220px height
│  │ FEATURED GUIDE                       │  │
│  │──────────────────────────────────────│  │
│  │         ● ○                          │  │   Auto-rotate
│  │    (Dot Navigation)                  │  │   every 5 sec
│  └──────────────────────────────────────┘  │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │  RESOURCE GRID (2×2)                 │  │
│  │                                      │  │
│  │  ┌──────────────┐  ┌──────────────┐  │  │
│  │  │ 🎒         │  │ 📢         │  │
│  │  │ Go-Bag      │  │ Emergency  │  │
│  │  │ Checklist   │  │ Updates    │  │
│  │  │             │  │             │  │
│  │  │ (Green)     │  │ (Orange)    │  │
│  │  └──────────────┘  └──────────────┘  │  ← 180px min-height
│  │  ┌──────────────┐  ┌──────────────┐  │
│  │  │ 🗺️          │  │ 🏢         │  │
│  │  │ Safe Routes  │  │ Evacuation  │  │
│  │  │              │  │ Centers     │  │
│  │  │              │  │             │  │
│  │  │ (Blue)       │  │ (Purple)    │  │
│  │  └──────────────┘  └──────────────┘  │
│  └──────────────────────────────────────┘  │
│                                            │
├────────────────────────────────────────────┤
│  GLOBAL NAVBAR                             │
│  📍 Map    ☎️ Phone    ((·)) Notification  │
└────────────────────────────────────────────┘
```

## 🎨 Color Reference

```
SOS Button & Accents
████ #FF2323 (Red)

Resource Tiles
████ #2ECC40 (Green)    - Go-Bag Checklist
████ #FF851B (Orange)   - Emergency Updates
████ #0074d9 (Blue)     - Safe Routes
████ #b10dc9 (Purple)   - Evacuation Centers
```

## 🔘 Interactive Elements

### SOS Action Button
```
State: Rest
  └─ Appearance: Red circle with pulsing rings
  └─ Animation: 2-second pulse (infinite)
  └─ Height: 180px
  └─ Shadow: Subtle drop shadow

State: Hover
  └─ No visual change (design decision)

State: Active (Tap)
  └─ Transform: scale(0.95)
  └─ Feedback: Toast notification
  └─ Message: "Emergency SOS activated! Help is being dispatched."
```

### Featured Carousel
```
State: Auto-Rotating
  └─ Interval: Every 5 seconds
  └─ Duration: 0.5s slide transition
  └─ Animation: Smooth cubic-bezier

State: User Interacting
  └─ Dot Click: Jump to specific slide
  └─ Swipe Left: Next slide
  └─ Swipe Right: Previous slide
  └─ Min Distance: 50px
```

### Resource Tiles
```
State: Rest
  └─ Background: White with light gray border
  └─ Opacity: 100%

State: Hover
  └─ Border: Same (design maintains consistency)

State: Active (Tap)
  └─ Transform: scale(0.95)
  └─ Background: Light overlay (5% dark)
  └─ Navigation: Navigate to respective page
```

## 📐 Component Dimensions

```
Dashboard Container
└─ Width: 390px (mobile fixed)
└─ Height: 844px (responsive)
└─ Padding: 24px horizontal, 20px top

SOS Action Area
└─ Button Diameter: 180px
└─ Ring 1 Diameter: 220px
└─ Ring 2 Diameter: 260px
└─ Hint Text Size: 14px
└─ Gap Below: 28px

Featured Carousel
└─ Height: 220px
└─ Border Radius: 18px
└─ Margin Below: 28px
└─ Slide Padding: 16px

Resource Grid
└─ Columns: 2 (equal width)
└─ Min Tile Height: 180px
└─ Column Gap: 16px
└─ Row Gap: 16px
└─ Flex: 1 (fills remaining space)
```

## 🎬 Animation Timings

```
SOS Pulse Ring 1
└─ Duration: 2s
└─ Timing: ease-out
└─ Loop: infinite
└─ Keyframes:
   ├─ 0%: scale(1), opacity(0.8)
   └─ 100%: scale(1.3), opacity(0)

SOS Pulse Ring 2
└─ Duration: 2s
└─ Timing: ease-out
└─ Loop: infinite
└─ Delay: 0.7s
└─ Keyframes: Same as Ring 1

Carousel Slide
└─ Duration: 0.5s
└─ Timing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
└─ Property: transform (translateX)

Carousel Dot
└─ Duration: 0.3s
└─ Property: background color
└─ Transform: scale(1.3) when active

Resource Tile
└─ Duration: 0.12s
└─ Property: transform (scale)
└─ Active: scale(0.95)
```

## 🔗 Navigation Map

```
Dashboard
├─ SOS Button → Toast Notification
├─ Carousel Slide 1 → (Future) page-survival-tips
├─ Carousel Slide 2 → (Future) page-first-aid
├─ Go-Bag Checklist → (Future) Not Implemented
├─ Emergency Updates Button → page-emergency-updates
├─ Safe Routes Button → page-safe-routes
├─ Evacuation Centers Button → page-evac-centers
├─ Navbar Map Button → page-safe-routes
└─ Navbar Notification Button → page-emergency-updates
```

## 🛠️ CSS Grid Layout

```
Resource Grid Structure
┌───────────────────────────────────────┐
│       Grid: 2 columns, auto rows      │
├────────────┬────────────┤
│    Tile    │    Tile    │ (Gap: 16px)
├────────────┼────────────┤
│    Tile    │    Tile    │
└────────────┴────────────┘

Grid Properties:
display: grid
grid-template-columns: 1fr 1fr
gap: 16px
flex: 1 (fills parentcontainer)
```

## 📝 Font Hierarchy

```
Carousel Title
└─ Font: Nunito
└─ Size: 18px
└─ Weight: 900
└─ Color: White

Carousel Eyebrow
└─ Font: Nunito
└─ Size: 11px
└─ Weight: 700
└─ Letter-spacing: 1px
└─ Opacity: 90%

Resource Tile Label
└─ Font: Nunito
└─ Size: 15px
└─ Weight: 800
└─ Color: Black
└─ Text-align: Center

SOS Label
└─ Font: Nunito
└─ Size: 24px
└─ Weight: 900
└─ Letter-spacing: 2px
└─ Color: Red

Hint Text
└─ Font: Nunito
└─ Size: 14px
└─ Weight: 500
└─ Color: Mid-gray
```

## 📱 Mobile Optimization

```
Touch Targets
├─ SOS Button: 180×180px (target: 48×48px min)
├─ Carousel Dots: 8×8px (easily spaced)
├─ Resource Tiles: ~175×180px (target: 44×44px min)
└─ All buttons: 44-48px effective touch area

Spacing
├─ Horizontal Padding: 20px
├─ Vertical Gaps: 12-28px
├─ Component Separation: Clear with whitespace

Responsiveness
├─ Fixed Container: 390px (optimized for mobile)
├─ Max Width: 430px (small tablets)
├─ Overflow: Hidden (no horizontal scroll)
└─ Smooth Scrolling: Default enabled
```

## 🎯 Interaction Flow

### User Taps SOS Button
```
1. Click event fires
2. Button scales to 0.95
3. Toast notification appears
4. "Emergency SOS activated! Help is being dispatched."
5. Toast auto-disappears after 2.2s
```

### User Views Carousel
```
1. Page loads
2. Carousel displays Slide 1
3. Dot 1 active, Dot 2 inactive
4. After 5s → Auto-advance to Slide 2
5. Dot 2 active, Dot 1 inactive
6. Cycle repeats every 5s
```

### User Swipes Carousel
```
1. User touches carousel (touchstart)
2. Record X position
3. User moves finger (drag)
4. User releases (touchend)
5. Calculate distance and direction
6. If > 50px left: Show next slide
7. If > 50px right: Show previous slide
8. Emit transform with transition
9. Update active dot
```

### User Clicks Resource Tile
```
1. Button scales to 0.95
2. Page navigation triggered
3. Active page transitions (slide-in animation)
4. New page becomes active
5. Previous page becomes inactive
```

## Icon Reference

| Component | Icon | Class | Font Awesome |
|-----------|------|-------|--------------|
| SOS | ! | fas fa-exclamation | ✓ |
| Go-Bag | 🎒 | fas fa-backpack | ✓ |
| Emergency | 📢 | fas fa-bullhorn | ✓ |
| Safe Routes | 🗺️ | fas fa-route | ✓ |
| Evacuation | 🏢 | fas fa-building-shield | ✓ |
| Carousel | → | fas fa-chevron-right | ✓ |
| Fallback Typhoon | 🏚️ | fas fa-house-damage | ✓ |
| Fallback First Aid | 🏥 | fas fa-first-aid | ✓ |

## 🔄 State Transitions

```
SOS Button States:
   ┌─────────────────────────────────────┐
   │         Default (Rest)              │
   │  Red circle + pulsing rings         │
   │  Hint text below                    │
   └───────────┬─────────────────────────┘
               │ Tap/Click
               ▼
   ┌─────────────────────────────────────┐
   │      Scale Down (0.95)              │
   │  Button compresses                  │
   │  Toast appears                      │
   └───────────┬─────────────────────────┘
               │ After 2.2s
               ▼
   ┌─────────────────────────────────────┐
   │         Default (Rest)              │
   │  Return to original state           │
   └─────────────────────────────────────┘
```

## 📊 File Size Breakdown

```
TyphoonGo Project Files:
├─ index.html           24.9 KB  (578 lines)
├─ style.css            52.0 KB  (1191 lines)
├─ script.js            14.0 KB  (358 lines)
└─ Resources
   ├─ jsconfig.json     0.4 KB
   └─ (Images: TBD)

Documentation Files:
├─ REFACTORING_SUMMARY.md              ~15 KB
├─ FINAL_VERIFICATION_CHECKLIST.md     ~12 KB
├─ DEVELOPER_IMPLEMENTATION_NOTES.md   ~25 KB
└─ PROJECT_COMPLETION_SUMMARY.md       ~18 KB
```

---

**Quick Reference Guide - v1.0**  
Use this guide for rapid understanding of dashboard structure and implementation.

