/**
 * Portfolio Interactive Scripts — Muhammad Zuhri Musthofa
 * High-performance, modern vanilla JavaScript with micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Dynamic Footer Year --- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* --- 2. Navbar Scroll Effects --- */
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle('scrolled', currentScrollY > 20);
    }

    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', currentScrollY > 400);
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- 3. Dark / Light Theme Toggle --- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;

  // Retrieve saved preference or fallback to system dark preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
  } else {
    body.classList.remove('light-mode');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      if (themeIcon) {
        themeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
      }
    });
  }

  /* --- 4. Interactive Typewriter Effect in Hero --- */
  const typewriterEl = document.getElementById('typewriterText');
  if (typewriterEl) {
    const roles = [
      'Fullstack Web Developer',
      'Frontend Craftsman',
      'Informatics Engineering Student',
      'Creative Problem Solver',
      'UI/UX Enthusiast'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // pause at full text
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // pause before typing next
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  /* --- 5. Mobile Navigation Menu Toggle --- */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- 6. Active Nav Item On Scroll (ScrollSpy) --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item-link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    });

    sections.forEach(sec => observer.observe(sec));
  }

  /* --- 7. Subtle 3D Card Hover Tilt Effect --- */
  const tiltCards = document.querySelectorAll('.tilt-effect');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* --- 8. Project Category Filter --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => { 
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCategory.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px) scale(0.96)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  /* --- 9. 1-Click Copy Email to Clipboard --- */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'muhammadzuhri@example.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalContent = copyEmailBtn.innerHTML;
        copyEmailBtn.classList.add('copied');
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';

        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          copyEmailBtn.innerHTML = originalContent;
        }, 2200);
      }).catch(() => {
        alert(`Email: ${email}`);
      });
    });
  }

  /* --- 10. Support / Traktir Kopi Modal --- */
  const openSupportBtn = document.getElementById('openSupportBtn');
  const supportModal = document.getElementById('supportModal');
  const closeSupportBtn = document.getElementById('closeSupportBtn');

  function openModal() {
    if (supportModal) {
      supportModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (supportModal) {
      supportModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (openSupportBtn) openSupportBtn.addEventListener('click', openModal);
  if (closeSupportBtn) closeSupportBtn.addEventListener('click', closeModal);

  if (supportModal) {
    supportModal.addEventListener('click', (e) => {
      if (e.target === supportModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && supportModal && supportModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* --- 11. Contact Form Handler --- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Kirim Pesan';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim Pesan...';
      }

      // Simulate network response or submit to form service
      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Pesan berhasil dikirim! Terima kasih telah menghubungi Muhammad Zuhri.';
        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }, 900);
    });
  }

  /* --- 12. Initialize AOS (Animate On Scroll) --- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 650,
      once: true,
      offset: 40,
      easing: 'ease-out-cubic'
    });
  }

});
