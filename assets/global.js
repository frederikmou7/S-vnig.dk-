/* ==========================================================================
   SOMIRA — global.js
   Delt UI-adfærd: header, mobilmenu, søgeoverlay, kurv-drawer (åbn/luk),
   accordion, scroll-reveal, toast og fokushåndtering.
   Kurvens DATA (add/update/remove) håndteres af assets/cart.js.
   ========================================================================== */

window.Somira = window.Somira || {};

(function () {
  'use strict';

  const qs = (sel, ctx) => (ctx || document).querySelector(sel);
  const qsa = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ---------------------------- Toast ---------------------------- */
  const toastEl = qs('#toast');
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl || !message) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2800);
  }
  window.Somira.toast = showToast;

  /* ---------------------------- Fokus / scroll-lås ---------------------------- */
  let lastFocused = null;

  function trapFocus(container, e) {
    if (e.key !== 'Tab') return;
    const focusable = qsa('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])', container)
      .filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  function anyOverlayOpen() {
    return qs('.cart-drawer.is-open') || qs('.search-overlay.is-open') || qs('.mobile-nav.is-open');
  }
  function lockScroll() { document.body.classList.add('no-scroll'); }
  function unlockScrollIfNoneOpen() {
    if (!anyOverlayOpen()) document.body.classList.remove('no-scroll');
  }
  window.Somira.lockScroll = lockScroll;
  window.Somira.unlockScrollIfNoneOpen = unlockScrollIfNoneOpen;
  window.Somira.trapFocus = trapFocus;
  window.Somira.setLastFocused = (el) => { lastFocused = el; };
  window.Somira.restoreFocus = () => { if (lastFocused) lastFocused.focus(); };

  /* ---------------------------- Header scroll-adfærd ---------------------------- */
  const header = qs('#siteHeader');
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 10) header.classList.add('is-fixed');
    else header.classList.remove('is-fixed');
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------------------- Mobilmenu ---------------------------- */
  const mobileNav = qs('#mobileNav');
  const mobileNavOverlay = qs('#mobileNavOverlay');

  function openMobileNav() {
    if (!mobileNav) return;
    lastFocused = document.activeElement;
    mobileNav.classList.add('is-open');
    mobileNavOverlay.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    qs('#hamburgerBtn').setAttribute('aria-expanded', 'true');
    lockScroll();
    qs('#mobileNavClose').focus();
  }
  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    mobileNavOverlay.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    qs('#hamburgerBtn').setAttribute('aria-expanded', 'false');
    unlockScrollIfNoneOpen();
    window.Somira.restoreFocus();
  }
  window.Somira.openMobileNav = openMobileNav;
  window.Somira.closeMobileNav = closeMobileNav;

  if (mobileNav) {
    qs('#hamburgerBtn').addEventListener('click', openMobileNav);
    qs('#mobileNavClose').addEventListener('click', closeMobileNav);
    mobileNavOverlay.addEventListener('click', closeMobileNav);
    mobileNav.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileNav(); trapFocus(mobileNav, e); });
    qsa('.mobile-nav-links a').forEach(a => a.addEventListener('click', closeMobileNav));
    const mobileSearchBtn = qs('#mobileSearchBtn');
    if (mobileSearchBtn) {
      mobileSearchBtn.addEventListener('click', () => { closeMobileNav(); setTimeout(() => window.Somira.openSearch(), 300); });
    }
  }

  /* ---------------------------- Søgeoverlay (åbn/luk — selve søgningen sker i predictive-search.js) ---------------------------- */
  const searchOverlay = qs('#searchOverlay');
  const searchInput = qs('#searchInput');

  function openSearch() {
    if (!searchOverlay) return;
    lastFocused = document.activeElement;
    searchOverlay.classList.add('is-open');
    searchOverlay.setAttribute('aria-hidden', 'false');
    lockScroll();
    searchInput.focus();
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('is-open');
    searchOverlay.setAttribute('aria-hidden', 'true');
    unlockScrollIfNoneOpen();
    window.Somira.restoreFocus();
  }
  window.Somira.openSearch = openSearch;
  window.Somira.closeSearch = closeSearch;

  if (searchOverlay) {
    qs('#searchOpenBtn').addEventListener('click', openSearch);
    qs('#searchCloseBtn').addEventListener('click', closeSearch);
    searchOverlay.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); trapFocus(searchOverlay, e); });
  }

  /* ---------------------------- Kurv-drawer: åbn/luk (data håndteres af cart.js) ---------------------------- */
  const cartDrawer = qs('#cartDrawer');
  const cartOverlay = qs('#cartOverlay');

  function openCart() {
    if (!cartDrawer) return;
    lastFocused = document.activeElement;
    cartDrawer.classList.add('is-open');
    cartOverlay.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    lockScroll();
    const closeBtn = qs('#cartCloseBtn');
    if (closeBtn) closeBtn.focus();
  }
  function closeCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('is-open');
    cartOverlay.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    unlockScrollIfNoneOpen();
    window.Somira.restoreFocus();
  }
  window.Somira.openCart = openCart;
  window.Somira.closeCart = closeCart;

  if (cartDrawer) {
    qs('#cartOpenBtn').addEventListener('click', openCart);
    document.addEventListener('click', e => {
      if (e.target.closest('#cartCloseBtn')) closeCart();
      if (e.target === cartOverlay) closeCart();
      if (e.target.closest('#cartEmptyShopBtn')) { closeCart(); }
    });
    cartDrawer.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); trapFocus(cartDrawer, e); });
  }

  /* ---------------------------- Global Escape (fallback) ---------------------------- */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (cartDrawer && cartDrawer.classList.contains('is-open')) closeCart();
    else if (searchOverlay && searchOverlay.classList.contains('is-open')) closeSearch();
    else if (mobileNav && mobileNav.classList.contains('is-open')) closeMobileNav();
  });

  /* ---------------------------- Accordion (delegeret — virker også efter DOM-opdateringer) ---------------------------- */
  document.addEventListener('click', e => {
    const trigger = e.target.closest('.accordion-trigger');
    if (!trigger) return;
    const panel = trigger.parentElement.querySelector('.accordion-panel');
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!isOpen));
    panel.style.maxHeight = isOpen ? '0px' : panel.scrollHeight + 'px';
  });

  /* ---------------------------- Scroll-reveal ---------------------------- */
  function observeReveals() {
    const targets = qsa('.reveal:not([data-reveal-bound])');
    targets.forEach(el => el.setAttribute('data-reveal-bound', 'true'));
    if (!targets.length) return;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
      targets.forEach(el => observer.observe(el));
    } else {
      targets.forEach(el => el.classList.add('is-visible'));
    }
  }
  window.Somira.observeReveals = observeReveals;
  observeReveals();

  document.addEventListener('DOMContentLoaded', observeReveals);
})();
