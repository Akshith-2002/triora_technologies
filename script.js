// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorGlow.classList.add('active');
});

document.addEventListener('mouseleave', () => {
  cursorGlow.classList.remove('active');
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.1;
  glowY += (mouseY - glowY) * 0.1;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ===== CARD SPOTLIGHT (cursor-following glow) =====
document.querySelectorAll('.spotlight').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--sx', (e.clientX - rect.left) + 'px');
    el.style.setProperty('--sy', (e.clientY - rect.top) + 'px');
  });
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

function closeMobileNav() {
  hamburger.classList.remove('active');
  mobileNav.classList.remove('open');
  header.classList.remove('nav-open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('active');
  header.classList.toggle('nav-open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile nav on link click
mobileNav.querySelectorAll('.mobile-nav__link, .mobile-nav__cta').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===== TILT EFFECT ON SERVICE CARDS =====
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -4;
    const rotateY = (x - centerX) / centerX * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.opacity = '1';
    btn.style.background = 'linear-gradient(135deg, #2dbd6e, #1fa855)';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 2500);
  }, 1200);
});

// ===== SOLUTIONS CAROUSEL =====
const solTrack = document.getElementById('solutionsTrack');
const solPrev = document.getElementById('solPrev');
const solNext = document.getElementById('solNext');

if (solTrack && solPrev && solNext) {
  const scrollAmount = 370;
  solNext.addEventListener('click', () => {
    solTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
  solPrev.addEventListener('click', () => {
    solTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
}

// ===== PARALLAX ON HERO MESH ORBS =====
const heroMesh = document.querySelector('.hero__mesh');
if (heroMesh) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroMesh.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });
}
