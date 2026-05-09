/* ============================================================
   TYPHOON GO — script.js
   Navigation, page transitions, and interactive logic
   ============================================================ */

'use strict';

// ── Leaflet Map Initialization ────────────────────────────────

let map;

/**
 * Initialize the Leaflet map for the Safe Routes page.
 * Uses OpenStreetMap tiles and centers on MSU-IIT, Iligan City, Philippines.
 */
function initFreeMap() {
  // Initialize the map with MSU-IIT coordinates
  map = L.map('map-container').setView([8.2411, 124.2439], 15);

  // Load free map tiles from OpenStreetMap
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Add marker for MSU-IIT
  let marker = L.marker([8.2411, 124.2439]).addTo(map);
  marker.bindPopup("<b>MSU-IIT</b><br>Iligan City, Lanao del Norte.").openPopup();
}

const pages = document.querySelectorAll('.page');

/**
 * Navigate to a page by its ID string.
 * Adds a slide-in animation class for visual polish.
 * Updates navbar active states based on current page.
 */
function navigateTo(targetId) {
  const currentActive = document.querySelector('.page.active');
  const target = document.getElementById(targetId);

  if (!target || target === currentActive) return;

  // Remove active from current
  if (currentActive) {
    currentActive.classList.remove('active');
  }

  // Activate target with animation
  target.classList.add('active');
  target.classList.add('slide-in');

  // Clean up animation class after it finishes
  target.addEventListener('animationend', () => {
    target.classList.remove('slide-in');
  }, { once: true });

  // Scroll target to top
  target.scrollTop = 0;

  // Update navbar active states
  updateNavbarActive(targetId);

  // Initialize map if navigating to Safe Routes page
  if (targetId === 'page-safe-routes') {
    setTimeout(() => {
      if (!map) {
        initFreeMap();
      } else {
        map.invalidateSize();
      }
    }, 100);
  }
}

/**
 * Update which navbar button is active based on current page
 */
function updateNavbarActive(pageId) {
  // Get all navbar buttons
  const navBtns = document.querySelectorAll('.nav-btn');
  
  // Remove active class from all
  navBtns.forEach(btn => btn.classList.remove('nav-active'));
  
  // Add active class to relevant button
  navBtns.forEach(btn => {
    const target = btn.getAttribute('data-target');
    if (target === pageId) {
      btn.classList.add('nav-active');
    }
  });
}

// ── Login Page Wiring ─────────────────────────────────────────

document.getElementById('btn-login').addEventListener('click', () => {
  navigateTo('page-dashboard');
});

document.getElementById('link-forgot').addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('page-forgot');
});

document.getElementById('btn-create-account').addEventListener('click', () => {
  navigateTo('page-register');
});

// ── Forgot Password Page ──────────────────────────────────────

document.getElementById('btn-reset-password').addEventListener('click', () => {
  const emailField = document.getElementById('forgot-email');
  const newPass = document.getElementById('forgot-new-pass');
  const confirmPass = document.getElementById('forgot-confirm-pass');

  if (!emailField.value.trim()) {
    showToast('Please enter your email.');
    return;
  }
  if (!newPass.value || newPass.value.length < 6) {
    showToast('Password must be at least 6 characters.');
    return;
  }
  if (newPass.value !== confirmPass.value) {
    showToast('Passwords do not match.');
    return;
  }

  showToast('Password reset successful!', true);
  setTimeout(() => navigateTo('page-login'), 1200);
});

document.getElementById('link-back-login-forgot').addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('page-login');
});

// ── Registration Page Wiring ──────────────────────────────────

document.getElementById('link-already-signed').addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('page-login');
});

document.getElementById('btn-register-submit').addEventListener('click', () => {
  navigateTo('page-login');
});

// ── Dashboard Wiring ──────────────────────────────────────────

document.getElementById('btn-tap-sos').addEventListener('click', () => {
  showToast('Emergency SOS activated! Help is being dispatched.');
});

document.getElementById('btn-evac-centers').addEventListener('click', () => {
  navigateTo('page-evac-centers');
});

document.getElementById('btn-safe-routes').addEventListener('click', () => {
  navigateTo('page-safe-routes');
});

document.getElementById('btn-emergency-updates').addEventListener('click', () => {
  navigateTo('page-emergency-updates');
});

// ── Back Buttons (generic) ────────────────────────────────────

// All elements with data-target attribute (nav buttons and back buttons)
document.querySelectorAll('[data-target]').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.getAttribute('data-target');
    if (target) navigateTo(target);
  });
});

// ── Carousel Functionality ────────────────────────────────────

let currentSlide = 0;
const carousel = document.getElementById('featured-carousel');
const carouselDots = document.querySelectorAll('.carousel-dot');

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide:not(.carousel-slide-btn)');

  // Update slide position using scrollLeft
  const slideWidth = carousel.clientWidth;
  carousel.scrollLeft = index * slideWidth;

  // Update dots
  carouselDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentSlide = index;
}

// Handle carousel slide button navigation (click to go to page)
document.querySelectorAll('.carousel-slide-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = btn.getAttribute('data-target');
    if (target) {
      navigateTo(target);
    }
  });
});

// Handle image load errors
document.querySelectorAll('.carousel-img').forEach((img, index) => {
  img.onerror = function() {
    console.warn(`Carousel image ${index} failed to load: ${this.src}`);
    this.parentElement.style.background = 'linear-gradient(135deg, #ddd 0%, #999 100%)';
    this.style.display = 'none';
  };
});

// Add click listeners to carousel dots
carouselDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.getAttribute('data-index'));
    showSlide(index);
  });
});

// Auto-rotate carousel every 5 seconds
setInterval(() => {
  const nextSlide = (currentSlide + 1) % 2;
  showSlide(nextSlide);
}, 5000);

// Add swipe/touch functionality for carousel
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchStartX - touchEndX > 50) {
    // Swiped left, go to next slide
    const nextSlide = (currentSlide + 1) % 2;
    showSlide(nextSlide);
  } else if (touchEndX - touchStartX > 50) {
    // Swiped right, go to previous slide
    const prevSlide = (currentSlide - 1 + 2) % 2;
    showSlide(prevSlide);
  }
}

// ── Safe Routes — Destination Dropdown ───────────────────────

const destinationToggle  = document.getElementById('destination-toggle');
const destinationDropdown = document.getElementById('destination-dropdown');
const destChevron         = document.getElementById('dest-chevron');
const travelInfoCard      = document.getElementById('travel-info-card');

destinationToggle.addEventListener('click', () => {
  const isOpen = destinationDropdown.style.display !== 'none';

  if (isOpen) {
    destinationDropdown.style.display = 'none';
    destChevron.classList.remove('open');
  } else {
    destinationDropdown.style.display = 'block';
    destChevron.classList.add('open');
  }
});

// Clicking a destination option shows travel info
document.querySelectorAll('.dest-option').forEach(option => {
  option.addEventListener('click', () => {
    const selectedName = option.querySelector('span').textContent.trim();
    document.querySelector('.dest-name').textContent = selectedName;
    document.querySelector('.dest-address').textContent = 'Iligan City, Lanao Del Norte, Philippines';

    // Close dropdown
    destinationDropdown.style.display = 'none';
    destChevron.classList.remove('open');

    // Show travel info
    travelInfoCard.style.display = 'block';
  });
});

// ── Evacuation Centers Search ──────────────────────────────────

document.getElementById('evac-search').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll('.evac-card');

  cards.forEach(card => {
    const name = card.querySelector('.evac-name').textContent.toLowerCase();
    const desc = card.querySelector('.evac-desc').textContent.toLowerCase();
    card.style.display = (name.includes(query) || desc.includes(query)) ? '' : 'none';
  });
});

// ── Emergency Updates Search ───────────────────────────────────

document.getElementById('alert-search').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll('.alert-card');

  cards.forEach(card => {
    const body = card.querySelector('.alert-body').textContent.toLowerCase();
    card.style.display = body.includes(query) ? '' : 'none';
  });
});

// ── Toast Notification ────────────────────────────────────────

/**
 * Shows a small non-intrusive toast notification inside the app wrapper.
 * @param {string} message - The message to display.
 * @param {boolean} [success=false] - Green for success, red for error.
 */
function showToast(message, success = false) {
  // Remove existing toast
  const existing = document.getElementById('app-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'app-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: absolute;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    background: ${success ? '#2ECC40' : '#FF2323'};
    color: #fff;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 700;
    padding: 10px 22px;
    border-radius: 24px;
    white-space: nowrap;
    z-index: 9999;
    box-shadow: 0 4px 18px rgba(0,0,0,0.2);
    animation: toastIn 0.25s ease both;
    pointer-events: none;
  `;

  // Inject keyframes if not already there
  if (!document.getElementById('toast-style')) {
    const style = document.createElement('style');
    style.id = 'toast-style';
    style.textContent = `
      @keyframes toastIn {
        from { opacity: 0; transform: translateX(-50%) translateY(10px); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  document.getElementById('app-wrapper').appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 320);
  }, 2200);
}


// ── Hamburger Menu (Dashboard) ───────────────────────────────

document.getElementById('btn-hamburger').addEventListener('click', () => {
  showToast('Menu coming soon!');
});

// ── Account Page Logout ──────────────────────────────────────

document.getElementById('btn-logout').addEventListener('click', () => {
  showToast('Logged out successfully!', true);
  setTimeout(() => navigateTo('page-login'), 1200);
});

// ── Init ─────────────────────────────────────────────────────

// Ensure only login page shows on load (already set via .active in HTML)
// Verify correct initial state
window.addEventListener('DOMContentLoaded', () => {
  // If no active page found, default to login
  const hasActive = document.querySelector('.page.active');
  if (!hasActive) {
    document.getElementById('page-login').classList.add('active');
  } else {
    // Set navbar active state if active page has navbar
    const activePage = document.querySelector('.page.active');
    if (activePage.id) {
      updateNavbarActive(activePage.id);
    }
  }
});
