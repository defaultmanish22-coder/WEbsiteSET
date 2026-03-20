// MK Digital Marketing - Main JS

// ===== MOBILE NAV =====
const toggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    toggle.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
  });
}

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-links a, .navbar-mobile a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#16a34a';
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; this.reset(); }, 3000);
  });
}

// ===== CATEGORY FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    document.querySelectorAll('.course-card').forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.val[data-target]').forEach(el => {
    const target = +el.dataset.target;
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { el.textContent = target + (el.dataset.suffix || ''); clearInterval(timer); }
      else { el.textContent = count + (el.dataset.suffix || ''); }
    }, 25);
  });
}

// Intersection Observer for stats
const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
  }, { threshold: 0.4 });
  obs.observe(statsBar);
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.feature-card, .course-card, .testimonial-card, .price-card');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; } });
}, { threshold: 0.1 });
revealEls.forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObs.observe(el);
});