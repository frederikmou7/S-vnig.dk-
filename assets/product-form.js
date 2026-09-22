/* ==========================================================================
   SOMIRA — product-form.js
   Kun indlæst på produktsiden. Håndterer variant-valg, antal,
   galleri-miniaturer, Add to cart (AJAX via cart.js) og relaterede
   produkter (Shopify Product Recommendations API).
   ========================================================================== */

(function () {
  'use strict';

  const qs = (sel, ctx) => (ctx || document).querySelector(sel);
  const qsa = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const form = qs('#ProductForm');
  if (!form) return;

  const strings = (window.Somira && window.Somira.strings) || {};

  /* ---------------------------- Beløbsformattering (matcher shop.money_format) ---------------------------- */
  function formatMoney(cents) {
    const format = window.Somira && window.Somira.moneyFormat ? window.Somira.moneyFormat : '{{amount}}';
    const amount = (cents / 100).toFixed(2);
    const withoutTrailing = amount.endsWith('.00') ? Math.round(cents / 100).toString() : amount.replace('.', ',');
    return format.replace(/\{\{\s*amount\s*\}\}/, withoutTrailing);
  }

  /* ---------------------------- Variant-data ---------------------------- */
  const variantScript = qs('script[id^="ProductJSON-"]');
  const variants = variantScript ? JSON.parse(variantScript.textContent) : [];

  const variantIdInput = qs('#ProductVariantId');
  const priceEl = qs('#ProductPrice');
  const addToCartBtn = qs('#ProductAddToCart');
  const addToCartText = qs('#ProductAddToCartText');
  const optionGroups = qsa('[data-option-index]');

  const selectedOptions = optionGroups.map(group => {
    const active = qs('[data-variant-option].is-active', group);
    return active ? active.getAttribute('data-value') : null;
  });

  function findMatchingVariant() {
    return variants.find(v => {
      const values = [v.option1, v.option2, v.option3];
      return selectedOptions.every((val, i) => val === null || values[i] === val);
    });
  }

  function renderPrice(variant) {
    if (!priceEl) return;
    let html = '<span class="price-current">' + formatMoney(variant.price) + '</span>';
    if (variant.compare_at_price && variant.compare_at_price > variant.price) {
      html += ' <span class="price-compare">' + formatMoney(variant.compare_at_price) + '</span>';
    }
    priceEl.innerHTML = html;
  }

  function updateForVariant(variant) {
    if (!variant) return;
    if (variantIdInput) variantIdInput.value = variant.id;
    renderPrice(variant);

    if (addToCartBtn) {
      addToCartBtn.disabled = !variant.available;
      if (addToCartText) addToCartText.textContent = variant.available ? strings.addToCart || 'Læg i kurv' : strings.soldOut || 'Udsolgt';
    }

    if (variant.featured_media) {
      const thumb = qs('[data-thumb][data-media-src*="' + variant.featured_media.id + '"]') ||
        qsa('[data-thumb]').find(t => (t.getAttribute('data-variant-ids') || '').split(',').includes(String(variant.id)));
      if (thumb) selectThumb(thumb);
    }
  }

  optionGroups.forEach(group => {
    qsa('[data-variant-option]', group).forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-option-index'), 10);
        selectedOptions[index] = btn.getAttribute('data-value');
        qsa('[data-variant-option]', group).forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const match = findMatchingVariant();
        if (match) updateForVariant(match);
      });
    });
  });

  /* ---------------------------- Antal ---------------------------- */
  const qtyInput = qs('#productQtyInput');
  const qtyValue = qs('#productQtyValue');
  const qtyMinus = qs('#productQtyMinus');
  const qtyPlus = qs('#productQtyPlus');
  if (qtyInput && qtyValue && qtyMinus && qtyPlus) {
    qtyMinus.addEventListener('click', () => {
      const next = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
      qtyInput.value = next;
      qtyValue.textContent = String(next);
    });
    qtyPlus.addEventListener('click', () => {
      const next = (parseInt(qtyInput.value, 10) || 1) + 1;
      qtyInput.value = next;
      qtyValue.textContent = String(next);
    });
  }

  /* ---------------------------- Galleri ---------------------------- */
  const mainImage = qs('[data-main-image]');
  function selectThumb(thumb) {
    qsa('[data-thumb]').forEach(t => t.classList.remove('is-active'));
    thumb.classList.add('is-active');
    if (mainImage) mainImage.src = thumb.getAttribute('data-media-src');
  }
  qsa('[data-thumb]').forEach(thumb => {
    thumb.addEventListener('click', () => selectThumb(thumb));
  });

  /* ---------------------------- Add to cart (AJAX) ---------------------------- */
  form.addEventListener('submit', e => {
    e.preventDefault();
    const variantId = variantIdInput ? variantIdInput.value : null;
    const qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
    const title = qs('#ProductTitle') ? qs('#ProductTitle').textContent.trim() : '';
    if (window.Somira && window.Somira.addToCart) {
      window.Somira.addToCart(variantId, qty, title);
    }
  });

  /* ---------------------------- Relaterede produkter ---------------------------- */
  const relatedRoot = qs('#related-products-root');
  if (relatedRoot) {
    const url = relatedRoot.getAttribute('data-url');
    if (url) {
      fetch(url)
        .then(res => res.text())
        .then(html => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const fresh = doc.getElementById('related-products-root');
          if (fresh && fresh.innerHTML.trim()) {
            relatedRoot.innerHTML = fresh.innerHTML;
            if (window.Somira && window.Somira.observeReveals) window.Somira.observeReveals();
          }
        })
        .catch(() => { /* stille fejl — sektionen forbliver tom */ });
    }
  }
})();
