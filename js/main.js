/* ═══════════════════════════════════════════
   Gotas de Humo — Main JavaScript
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Mobile Menu Toggle ──
  const toggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // ── Scroll Reveal (IntersectionObserver) ──
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ── Active nav link on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === '#' + id;
            link.classList.toggle('text-white', isActive);
            link.classList.toggle('bg-white/5', isActive);
            link.classList.toggle('text-zinc-400', !isActive);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((s) => scrollObserver.observe(s));

  // ── Navbar shadow on scroll ──
  const navbar = document.getElementById('navbar');

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 20) {
        navbar.classList.add('shadow-lg', 'shadow-black/20');
      } else {
        navbar.classList.remove('shadow-lg', 'shadow-black/20');
      }
    },
    { passive: true }
  );

  // ── Keyboard accessibility for flip cards ──
  document.querySelectorAll('.card-flip').forEach((card) => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('hover');
      }
    });
  });
})();
