/* ==========================================================================
   SØVNIG — cart.js
   Rigtig Shopify AJAX-kurv. Ingen localStorage / demo-data.
   Håndterer: quick-add (produktkort, sæt-promo), samt quantity/remove
   inde i kurv-draweren. /cart-siden bruger native formular-submit i
   stedet (se sections/main-cart.liquid) og rammes ikke af denne fil.
   ========================================================================== */

(function () {
  'use strict';

  const qs = (sel, ctx) => (ctx || document).querySelector(sel);
  const routes = (window.Sovnig && window.Sovnig.routes) || {};
  const strings = (window.Sovnig && window.Sovnig.strings) || {};

  const cartDrawer = qs('#cartDrawer');
  const cartDrawerInner = qs('#cartDrawerInner');
  const cartBadge = qs('[data-cart-badge]');

  /* ---------------------------- Hjælpefunktioner ---------------------------- */
  function setBusy(isBusy) {
    if (cartDrawer) cartDrawer.classList.toggle('is-busy', isBusy);
  }

  async function refreshCartDrawer() {
    if (!cartDrawerInner || !routes.cartUrl) return;
    try {
      const res = await fetch(routes.cartUrl + '?section_id=cart-drawer');
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const fresh = doc.getElementById('cartDrawerInner');
      if (fresh) {
        cartDrawerInner.innerHTML = fresh.innerHTML;
      }
    } catch (err) {
      /* stille fejl — badge er stadig opdateret fra cart.js JSON-kald */
    }
  }

  function updateBadge(count) {
    if (!cartBadge) return;
    cartBadge.textContent = String(count);
    cartBadge.hidden = count === 0;
  }

  function showAddedToast(title) {
    if (!window.Sovnig || !window.Sovnig.toast) return;
    const template = strings.addedTemplate || '%%TITLE%% er lagt i kurven.';
    window.Sovnig.toast(template.replace('%%TITLE%%', title));
  }

  async function getCartState() {
    const res = await fetch('/cart.js');
    return res.json();
  }

  /* ---------------------------- Tilføj til kurv ---------------------------- */
  async function addToCart(variantId, quantity, title) {
    if (!variantId) return;
    setBusy(true);
    try {
      const res = await fetch(routes.cartAddUrl || '/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: quantity || 1 })
      });
      if (!res.ok) throw new Error('add failed');

      const cartState = await getCartState();
      updateBadge(cartState.item_count);
      await refreshCartDrawer();
      showAddedToast(title);
      if (window.Sovnig && window.Sovnig.openCart) window.Sovnig.openCart();
    } catch (err) {
      if (window.Sovnig && window.Sovnig.toast) window.Sovnig.toast(strings.error || 'Der opstod en fejl. Prøv igen.');
    } finally {
      setBusy(false);
    }
  }
  window.Sovnig = window.Sovnig || {};
  window.Sovnig.addToCart = addToCart;

  /* ---------------------------- Ret antal / fjern linje (kun i drawer) ---------------------------- */
  async function changeLine(key, quantity) {
    setBusy(true);
    try {
      const res = await fetch(routes.cartChangeUrl || '/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: key, quantity: quantity })
      });
      const cartState = await res.json();
      updateBadge(cartState.item_count);
      await refreshCartDrawer();
    } catch (err) {
      if (window.Sovnig && window.Sovnig.toast) window.Sovnig.toast(strings.error || 'Der opstod en fejl. Prøv igen.');
    } finally {
      setBusy(false);
    }
  }

  /* ---------------------------- Delegerede klik ---------------------------- */
  document.addEventListener('click', e => {
    // Quick add — produktkort og sæt-promo (virker overalt på sitet)
    const quickAddBtn = e.target.closest('[data-quick-add-form]');
    if (quickAddBtn) {
      e.stopPropagation();
      e.preventDefault();
      addToCart(
        quickAddBtn.getAttribute('data-variant-id'),
        1,
        quickAddBtn.getAttribute('data-product-title') || ''
      );
      return;
    }

    // Quantity / remove — kun inde i kurv-draweren
    if (!cartDrawer) return;
    const item = e.target.closest('[data-cart-item]');
    if (!item || !cartDrawer.contains(item)) return;
    const key = item.getAttribute('data-key');

    if (e.target.closest('[data-cart-qty-plus]')) {
      const valueEl = item.querySelector('[data-cart-qty-value]');
      const next = parseInt(valueEl.textContent, 10) + 1;
      changeLine(key, next);
    } else if (e.target.closest('[data-cart-qty-minus]')) {
      const valueEl = item.querySelector('[data-cart-qty-value]');
      const next = parseInt(valueEl.textContent, 10) - 1;
      changeLine(key, Math.max(0, next));
    } else if (e.target.closest('[data-cart-remove]')) {
      changeLine(key, 0);
    }
  });
})();
