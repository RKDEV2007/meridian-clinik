/**
 * Meridian Medical — Main JavaScript
 * Sticky header, mobile menu, FAQ accordion, scroll reveal, smooth scroll
 */

(function () {
  'use strict';

  // ----- Sticky header scroll state -----
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScroll = 0;
    const onScroll = () => {
      const top = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle('is-scrolled', top > 20);
      lastScroll = top;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----- Mobile menu -----
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('is-open'));
      document.body.style.overflow = mainNav.classList.contains('is-open') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 901) {
          mainNav.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      });
    });

    // Dropdown toggle on mobile
    const dropdownParents = document.querySelectorAll('.nav-item--dropdown');
    dropdownParents.forEach(parent => {
      const trigger = parent.querySelector('.nav-link');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          if (window.innerWidth < 901) {
            e.preventDefault();
            parent.classList.toggle('is-open');
          }
        });
      }
    });
  }

  // ----- FAQ accordion -----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      faqItems.forEach(other => {
        other.classList.remove('is-open');
        const c = other.querySelector('.faq-content');
        if (c) c.style.maxHeight = '';
      });
      if (!isOpen) {
        item.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ----- Scroll reveal -----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Form placeholder (no submit) -----
  const forms = document.querySelectorAll('form[data-no-submit]');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Sending…';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Thank you. We will contact you shortly.';
          setTimeout(() => {
            btn.textContent = orig;
            btn.disabled = false;
          }, 3000);
        }, 800);
      }
    });
  });
})();
