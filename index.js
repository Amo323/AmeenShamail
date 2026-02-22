/* ============================================================
   index.js — Main page JavaScript
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // PARTICLE BACKGROUND
  // ============================================================
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 60;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.15,
    };
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 255, 218, ${p.a})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(100, 255, 218, ${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }

  drawParticles();

  // ============================================================
  // TYPED TEXT ANIMATION
  // ============================================================
  const typedEl = document.querySelector('.typed-text');

  if (typedEl) {
    const phrases = [
      'Computer Engineering Student.',
      'Full-Stack Developer.',
      'CCNA Network Engineer.',
      'AI Prompt Engineer.',
      'Top IT Graduate.',
    ];

    let pIdx = 0;
    let lIdx = 0;
    let deleting = false;

    const TYPE_SPD = 70;
    const DEL_SPD = 38;
    const PAUSE_DONE = 2000;
    const PAUSE_DEL = 450;

    function type() {
      const cur = phrases[pIdx];

      if (deleting) {
        typedEl.textContent = cur.substring(0, lIdx - 1);
        lIdx--;
        if (lIdx === 0) {
          deleting = false;
          pIdx = (pIdx + 1) % phrases.length;
          setTimeout(type, PAUSE_DEL);
        } else {
          setTimeout(type, DEL_SPD);
        }
      } else {
        typedEl.textContent = cur.substring(0, lIdx + 1);
        lIdx++;
        if (lIdx === cur.length) {
          deleting = true;
          setTimeout(type, PAUSE_DONE);
        } else {
          setTimeout(type, TYPE_SPD);
        }
      }
    }

    setTimeout(type, 800);
  }

  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  const revealEls = document.querySelectorAll('.reveal');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = '0s';
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Stagger siblings in the same parent
  const revealGroups = {};
  revealEls.forEach(el => {
    const parent = el.parentElement;
    if (!revealGroups[parent]) revealGroups[parent] = [];
    revealGroups[parent].push(el);
  });

  Object.values(revealGroups).forEach(group => {
    group.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  revealEls.forEach(el => revealObs.observe(el));

  // ============================================================
  // SKILL BAR ANIMATION
  // ============================================================
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => skillObs.observe(fill));

  // ============================================================
  // HEADER SCROLL EFFECT
  // ============================================================
  const header = document.getElementById('site-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ============================================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(section => sectionObs.observe(section));

  // ============================================================
  // HAMBURGER MENU
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const primaryNav = document.getElementById('primary-nav');

  if (hamburger && primaryNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      primaryNav.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open.toString());
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on nav link click
    primaryNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        primaryNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!primaryNav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        primaryNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================================
  // SMOOTH SCROLL
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================================
  // BACK TO TOP
  // ============================================================
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('show', window.scrollY > 500);
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});