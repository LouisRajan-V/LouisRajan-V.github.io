/* ======================================
   LOUIS RAJAN PORTFOLIO — SCRIPT.JS
   ====================================== */

// ── 1. Particle Canvas Background ──────────────────────────────────
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

function randomBetween(a, b) { return a + Math.random() * (b - a); }

function initParticles() {
  particles = [];
  const count = Math.floor((W * H) / 14000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x:    randomBetween(0, W),
      y:    randomBetween(0, H),
      r:    randomBetween(.5, 2),
      dx:   randomBetween(-.3, .3),
      dy:   randomBetween(-.3, .3),
      alpha: randomBetween(.2, .7),
    });
  }
}
initParticles();

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(96,165,250,${p.alpha})`;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > W) p.dx *= -1;
    if (p.y < 0 || p.y > H) p.dy *= -1;
  });

  // draw faint lines between close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(96,165,250,${.12 * (1 - dist / 130)})`;
        ctx.lineWidth = .6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();


// ── 2. Navbar scroll effect ─────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


// ── 3. Hamburger menu ───────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// close on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


// ── 4. Typing Effect ────────────────────────────────────────────────
const roles = [
  'Software Developer',
  'Python Enthusiast',
  'Automation Builder',
  'Web Developer',
];
const typedEl = document.getElementById('typed-text');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 45);
  }
}
typeLoop();


// ── 5. Scroll Reveal ────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));


// ── 6. Skill Bars ───────────────────────────────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.w + '%';
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(el => skillObserver.observe(el));


// ── 7. Counter Animation ────────────────────────────────────────────
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target);
      let current  = 0;
      const step   = Math.ceil(target / 50);
      const interval = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target; clearInterval(interval); }
        else { el.textContent = current; }
      }, 30);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));


// ── 8. Active Nav link highlight on scroll ──────────────────────────
const sections   = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--txt1)' : '';
  });
});
