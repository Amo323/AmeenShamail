    // Project data
    const projects = {
      1: {
        title: "Hospital Network",
        description: "Creating a simple Hospital Network.  1 Routers for each branch & 1 as backup for each branch (2811 Router models)",
        technologies: ["Cisco", "IP", "EIGRP", "ACL", "HSRP", "Static NAT", "AAA"],
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      2: {
        title: "Police Management System",
        description: "A simple web-based police Management System for my graduation project",
        technologies: ["Laravel", "HTML", "CSS", "JS", "PHP", "SQL"],
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      3: {
        title: "SwiftLogix Technologies company network",
        description: "A mid-siz network for SwiftLogix Technologies network.",
        technologies: ["Cisco","Basic Security configration ", "VLAN", "IP subnetting", "Inter-VLAN Routing", "Local Username & password", "Message of the day", "CDP", "Port Security", "IP helper"],
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      4: {
        title: "This webiste",
        description: "Letting Ai write this website without me doing much of work :)",
        technologies: ["claude.ai", "chatgpt.com"],
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    };

    // DOM elements
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    // Filter functionality
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;
        
        // Update active tab
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
          const category = card.dataset.category;
          
          if (filter === 'all' || category === filter) {
            card.classList.add('visible');
            card.style.display = 'block';
          } else {
            card.classList.remove('visible');
            card.style.display = 'none';
          }
        });
        
        // Add animation delay for visible cards
        const visibleCards = document.querySelectorAll('.project-card.visible');
        visibleCards.forEach((card, index) => {
          card.style.animationDelay = `${index * 0.1}s`;
        });
      });
    });

    // Modal functionality
    function openModal(projectId) {
      const project = projects[projectId];
      if (!project) return;
      
      modalBody.innerHTML = `
        <div class="modal-header">
          <h2>${project.title}</h2>
        </div>
        <div class="modal-video">
          <iframe 
            src="${project.video}" 
            frameborder="0" 
            allowfullscreen>
          </iframe>
        </div>
        <div class="modal-description">
          <h3>Project Overview</h3>
          <p>${project.description}</p>
        </div>
        <div class="modal-technologies">
          <h3>Technologies Used</h3>
          <div class="tech-list">
            ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
          </div>
        </div>
      `;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
      modalBody.innerHTML = '';
    }

    // Event listeners for modal
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = trigger.dataset.project;
        openModal(projectId);
      });
    });

    modalClose.addEventListener('click', closeModal);

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add loading animation for project images
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
      img.addEventListener('load', function() {
        this.style.opacity = '1';
      });
      
      // If image is already cached
      if (img.complete) {
        img.style.opacity = '1';
      }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all project cards
    projectCards.forEach(card => {
      observer.observe(card);
    });

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
      });
    }

    // Add ripple effect to buttons
    function createRipple(event) {
      const button = event.currentTarget;
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
      circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
      circle.classList.add('ripple');
      
      const ripple = button.getElementsByClassName('ripple')[0];
      if (ripple) {
        ripple.remove();
      }
      
      button.appendChild(circle);
    }

    // Apply ripple effect to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', createRipple);
    });

    // Initialize page
    document.addEventListener('DOMContentLoaded', () => {
      // Add entrance animation to hero section
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        setTimeout(() => {
          heroSection.classList.add('animate-in');
        }, 100);
      }
      
      // Stagger animation for filter tabs
      const tabs = document.querySelectorAll('.filter-tab');
      tabs.forEach((tab, index) => {
        setTimeout(() => {
          tab.classList.add('animate-in');
        }, 200 + (index * 100));
      });
      
      // Initial animation for visible project cards
      const visibleCards = document.querySelectorAll('.project-card.visible');
      visibleCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-in');
        }, 400 + (index * 150));
      });
    });
