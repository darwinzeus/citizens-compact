// =============================================
// Citizens' Compact 2029 — Main JS
// =============================================

// Scroll reveal for policy cards
function initReveal() {
  const targets = document.querySelectorAll('.policy-card, .tier-header, .opening-quote, .compact-overview, .contribute-inner > *');
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Slight stagger for grids
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Math.min(idx * 80, 320));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

// Highlight active nav link on scroll
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

// Add active nav style
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--charcoal); background: var(--stone-100); }`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initActiveNav();
});
