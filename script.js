/* =============================================
   Aurelia Bridges Counselling & Psychotherapy
   Shared JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile Menu --- */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navOverlay = document.getElementById('nav-overlay');

  function closeMenu() {
    mainNav.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isActive = mainNav.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', String(isActive));
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }

    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  /* --- Header Scroll Effect --- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- FAQ Accordion --- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('active');
        const btn = i.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if it was closed)
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --- Scroll-Triggered Fade-In Animations --- */
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  /* --- Cookie Notice --- */
  const cookieNotice = document.getElementById('cookie-notice');
  const cookieAccept = document.getElementById('cookie-accept');
  const cookieDecline = document.getElementById('cookie-decline');

  if (cookieNotice && cookieAccept) {
    if (!localStorage.getItem('ab-cookies-accepted') && !localStorage.getItem('ab-cookies-declined')) {
      setTimeout(() => cookieNotice.classList.add('visible'), 1500);
    }

    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('ab-cookies-accepted', 'true');
      cookieNotice.classList.remove('visible');
    });

    if (cookieDecline) {
      cookieDecline.addEventListener('click', () => {
        localStorage.setItem('ab-cookies-declined', 'true');
        cookieNotice.classList.remove('visible');
      });
    }
  }

  /* --- Contact Form (mailto) --- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('#name').value;
      const email = contactForm.querySelector('#email').value;
      const phone = contactForm.querySelector('#phone').value || 'Not provided';
      const contactMethod = contactForm.querySelector('input[name="contact_method"]:checked');
      const contactMethodValue = contactMethod ? contactMethod.value : 'Not specified';
      const message = contactForm.querySelector('#message').value || 'No message provided';

      const subject = encodeURIComponent('Therapy Enquiry from ' + name);
      const body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + phone + '\n' +
        'Preferred Contact Method: ' + contactMethodValue + '\n\n' +
        'Message:\n' + message
      );

      window.location.href = 'mailto:counselling@aureliabridges.com?subject=' + subject + '&body=' + body;

      // Brief note to the user
      const note = document.createElement('p');
      note.className = 'form-note';
      note.textContent = 'Your email client should now open with your message. If it does not, please email counselling@aureliabridges.com directly.';
      note.style.marginTop = '1rem';
      note.style.color = 'var(--color-primary)';
      note.style.fontWeight = '600';
      const existingNote = contactForm.querySelector('.mailto-note');
      if (!existingNote) {
        note.classList.add('mailto-note');
        contactForm.appendChild(note);
      }
    });
  }

  /* --- Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

});
