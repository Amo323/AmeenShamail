/* ============================================================
   projects.js — Projects page JavaScript
   ============================================================ */

// ============================================================
// PROJECT DATA
// ============================================================
const projects = {
  1: {
    title: "Hospital Network Simulation",
    category: "Networking",
    description: "Architected a multi-branch hospital network utilizing Cisco 2811 routers with 1 primary and 1 backup router per branch — ensuring high availability and fault tolerance for critical medical systems. (Feb 2024 – Apr 2024)",
    technologies: ["Cisco 2811", "IP", "EIGRP", "ACL", "HSRP", "Static NAT", "AAA"],
    video: "https://www.youtube.com/embed/eHxgkOka1Dw?si=d1HG-ddLTQxQsQ6p"
  },
  2: {
    title: "Police Management System",
    category: "Web Development",
    description: "Engineered a web-based management system for police data tracking and organizational workflows as a graduation project. Features role-based access control, case tracking, and officer record management. (Dec 2024 – Jan 2025)",
    technologies: ["Laravel", "HTML", "CSS", "JavaScript", "PHP", "SQL"],
    video: "https://www.youtube.com/embed/hXFJHo94FSI?si=COJ5XrOqUQCDkSuO"
  },
  3: {
    title: "SwiftLogix Technologies Network",
    category: "Networking",
    description: "Designed a mid-size corporate network for SwiftLogix Technologies with VLANs, inter-VLAN routing, DHCP relay, port security, and Cisco Discovery Protocol. (Jun 2025)",
    technologies: ["Cisco", "Basic Security Configuration", "VLAN", "IP Subnetting", "Inter-VLAN Routing", "Local Username & Password", "Message of the Day", "CDP", "Port Security", "IP Helper"],
    video: "https://www.youtube.com/embed/TH6xTFY6zN0?si=XNmke0d_lSgApOh4"
  },
  4: {
    title: "Portfolio Website",
    category: "Web Development",
    description: "Builying it while leveraging the power of AI-assisted development techniques using LLMs for code generation, debugging, and documentation. Letting AI do the magic while I do the planing, design, and other task if the LLM makes any mistakes. (May–Jun 2025)",
    technologies: ["claude.ai", "ChatGPT", "HTML", "CSS", "JavaScript", "AI Prompt Engineering"],
    video: "https://www.youtube.com/embed/Kc33kSJXync?si=CZ04bwz-sKxvF__E"
  },
  5: {
    title: "FutureTech Solutions Network",
    category: "Networking",
    description: "Designed a mid-size corporate network for FutureTech Solutions with advanced security — SSH-only remote access, Named Extended ACLs, RIP v2 dynamic routing, LLDP neighbor discovery, and port security on all switches. (Jun 2025)",
    technologies: ["Basic Security Configuration", "VLAN (Named)", "Inter-VLAN Routing", "Local Username & Password", "Message of the Day", "LLDP", "Port Security", "SSH Only", "Named ACL", "RIP V2", "IP Helper"],
    video: "https://www.youtube.com/embed/c0qSKU1zs1c?si=Gojt4mQed0D5di3X"
  },
  6: {
    title: "KoKyu Full-Stack Web Application",
    category: "Web Development",
    description: "Developed a comprehensive full-stack platform featuring an administrative panel, dynamic database-driven menus, events management system, career application portal, and automated email notification systems for event requests and career applications. (Aug 2025 – Sep 2025)",
    technologies: ["Laravel", "PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    video: "https://www.youtube.com/embed/gkn2KNbAcVo?si=eqeoKxPuuh7QHYON"
  }
};

// ============================================================
// DOM REFERENCES
// ============================================================
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primary-nav');
const header = document.getElementById('site-header');

// ============================================================
// PARTICLE BACKGROUND
// ============================================================
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const COUNT = 55;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

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

  for (let i = 0; i < COUNT; i++) particles.push(createParticle());

  function draw() {
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
    requestAnimationFrame(draw);
  }
  draw();
})();

// ============================================================
// HEADER SCROLL
// ============================================================
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});

// ============================================================
// HAMBURGER MENU
// ============================================================
if (hamburger && primaryNav) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    primaryNav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  primaryNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      primaryNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

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
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// ============================================================
// PROJECT CARD ENTER ANIMATION
// ============================================================
const cardObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, _) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      cardObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

projectCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
  cardObs.observe(card);
});

// ============================================================
// FILTER TABS
// ============================================================
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;

    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    projectCards.forEach((card, i) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !visible);
      if (visible) {
        card.style.transitionDelay = `${i * 0.06}s`;
        card.classList.add('animate-in');
      }
    });
  });
});

// ============================================================
// MODAL
// ============================================================
function openModal(projectId) {
  const p = projects[projectId];
  if (!p) return;

  modalBody.innerHTML = `
    <div class="modal-header">
      <h2 id="modalTitle">${p.title}</h2>
      <span class="modal-category-badge">${p.category}</span>
    </div>
    <div class="modal-video">
      <iframe
        src="${p.video}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy">
      </iframe>
    </div>
    <div class="modal-description">
      <h3>Project Overview</h3>
      <p>${p.description}</p>
    </div>
    <div class="modal-technologies">
      <h3>Technologies Used</h3>
      <div class="tech-list">
        ${p.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  // Clear iframe src to stop video playback
  const iframe = modalBody.querySelector('iframe');
  if (iframe) iframe.src = iframe.src;
}

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(trigger.dataset.project);
  });
});

if (modalClose) modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

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
