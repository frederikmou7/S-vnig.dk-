/* ==========================================================================
   SØVNIG — Prototype script
   Ingen backend. Kurvens tilstand gemmes udelukkende i localStorage.
   Produktdata, materialer, anmeldelser og USP'er herunder er
   PROTOTYPE-PLACEHOLDERS — se kommentarer i index.html for detaljer.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------- Hjælpefunktioner ---------------------------- */
  const qs = (sel, ctx) => (ctx || document).querySelector(sel);
  const qsa = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function img(id, w) {
    return 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=' + w + '&q=80';
  }

  function formatKr(amount) {
    return amount.toLocaleString('da-DK') + ' kr.';
  }

  const FREE_SHIPPING_THRESHOLD = 799;

  /* ---------------------------- Produktdata (prototype) ----------------------------
     Alle beskrivelser, USP'er, materialer og accordion-tekster er placeholders
     til et tidligt koncept og er ikke bekræftede produktspecifikationer.
     Sundheds- eller behandlingspåstande er bevidst undgået. */
  const PRODUCTS = {
    'puden': {
      id: 'puden',
      name: 'Søvnig Puden',
      category: 'PUDER',
      price: 799,
      badge: 'SØVNIG FAVORIT',
      rating: 4.8,
      description: 'Blød komfort inspireret af følelsen fra en god hotelseng.',
      longDescription: 'Blød, hvor du vil have den. Support, hvor du har brug for den. Designet til at give dig følelsen af en god hotelseng, hjemme hos dig selv.',
      images: [
        img('1648475234432-f8a94f1338e7', 1200),
        img('1542716507-9c9c00501321', 1200),
        img('1612365416820-33b8d140f476', 1200)
      ],
      cardImage: img('1628044230700-7fc3fb8d0192', 900),
      variants: ['BLØD', 'MEDIUM', 'FAST'],
      defaultVariant: 'MEDIUM',
      usps: ['Premium komfort', 'Tilpasset følelse', 'Åndbare materialer', '30 nætters prøveperiode'],
      accordion: [
        { title: 'Produktdetaljer', content: 'En pude designet til at give følelsen af den, du synker ned i på en god hotelseng. Prototype-koncept — endeligt fyld og konstruktion er stadig under udvikling.' },
        { title: 'Materialer', content: 'Materialesammensætningen er endnu ikke fastlagt for det endelige Søvnig-sortiment. Dette er placeholder-tekst til prototypen og skal ikke opfattes som en bekræftet specifikation.' },
        { title: 'Fragt & retur', content: 'Fri fragt ved køb over 799 kr. Ordrer behandles typisk inden for 1-2 hverdage; præcis leveringstid bekræftes ved checkout, når fragtaftaler er på plads. 30 dages returret.' },
        { title: 'Vedligeholdelse', content: 'Vaskeanvisning følger med den endelige emballage. Placeholder-vejledning: kan vaskes ved lav temperatur, tørretumbles ved lav varme.' }
      ]
    },
    'naesestrips': {
      id: 'naesestrips',
      name: 'Søvnig Næsestrips',
      category: 'AFTENRUTINE',
      price: 129,
      badge: null,
      rating: null,
      description: 'En enkel del af din aftenrutine.',
      longDescription: 'En minimalistisk pakke med flere næsestrips — en lille, enkel del af aftenen, uden at det skal føles som en stor omgang.',
      images: [
        img('1633857099824-75d9a3c42f77', 1200),
        img('1740324974158-8e290f4c1d24', 1200)
      ],
      cardImage: img('1633857099824-75d9a3c42f77', 900),
      variants: [],
      usps: [],
      accordion: [
        { title: 'Produktdetaljer', content: 'En pakke med flere strips i en enkel, minimalistisk emballage. Prototype-koncept — endelig pakningsstørrelse er stadig under udvikling.' },
        { title: 'Materialer', content: 'Materialesammensætningen er endnu ikke fastlagt. Placeholder-tekst til prototypeformål.' },
        { title: 'Fragt & retur', content: 'Fri fragt ved køb over 799 kr. 30 dages returret. Præcis leveringstid bekræftes ved checkout.' },
        { title: 'Vedligeholdelse', content: 'Til engangsbrug. Opbevares tørt og køligt.' }
      ]
    },
    'sovemasken': {
      id: 'sovemasken',
      name: 'Søvnig Sovemasken',
      category: 'SØVN',
      price: 249,
      badge: null,
      rating: null,
      description: 'Total mørke. Uanset hvor du sover.',
      longDescription: 'En blød, formstøbt sovemaske designet til at skabe total mørke — i din egen seng, på farten, eller alle andre steder du falder i søvn.',
      images: [
        img('1666934209818-cd6a6d08bd8d', 1200),
        img('1631310709791-1b3701c7a335', 1200)
      ],
      cardImage: img('1666934209818-cd6a6d08bd8d', 900),
      variants: [],
      usps: [],
      accordion: [
        { title: 'Produktdetaljer', content: 'En blød, formstøbt maske designet til total mørke. Prototype-koncept — endelig pasform og konstruktion er stadig under udvikling.' },
        { title: 'Materialer', content: 'Materialesammensætningen er endnu ikke fastlagt. Placeholder-tekst til prototypeformål.' },
        { title: 'Fragt & retur', content: 'Fri fragt ved køb over 799 kr. 30 dages returret. Præcis leveringstid bekræftes ved checkout.' },
        { title: 'Vedligeholdelse', content: 'Placeholder-vejledning: pletrenses, må ikke tørretumbles.' }
      ]
    },
    'saettet': {
      id: 'saettet',
      name: 'Søvnig Sættet',
      category: 'SÆT',
      price: 999,
      compareAtPrice: 1177,
      badge: 'SPAR 178 KR.',
      rating: null,
      description: 'Puden, Sovemasken & Næsestrips.',
      longDescription: 'Den komplette Søvnig-aftenrutine i ét sæt — Søvnig Puden, Søvnig Sovemasken og Søvnig Næsestrips, samlet.',
      images: [
        img('1550328927-3b33885318fa', 1200),
        img('1630660664869-c9d3cc676880', 1200)
      ],
      cardImage: img('1550328927-3b33885318fa', 900),
      variants: [],
      usps: [],
      accordion: [
        { title: 'Dette er inkluderet', content: 'Én Søvnig Pude, én Søvnig Sovemaske og én pakke Søvnig Næsestrips. Puden leveres som standard i variant Medium, når den købes som en del af sættet.' },
        { title: 'Materialer', content: 'Materialesammensætningen er endnu ikke fastlagt. Placeholder-tekst til prototypeformål.' },
        { title: 'Fragt & retur', content: 'Fri fragt ved køb over 799 kr. 30 dages returret. Præcis leveringstid bekræftes ved checkout.' },
        { title: 'Vedligeholdelse', content: 'Vaskeanvisning følger med den endelige emballage for hvert produkt i sættet.' }
      ]
    }
  };

  /* ---------------------------- Kurv-tilstand ---------------------------- */
  const CART_KEY = 'soevnigCart';

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* storage utilgængelig */ }
  }

  let cart = loadCart();

  function lineKey(productId, variant) { return productId + '::' + (variant || ''); }

  function addToCart(productId, variant, qty) {
    qty = qty || 1;
    const existing = cart.find(l => lineKey(l.productId, l.variant) === lineKey(productId, variant));
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ productId, variant: variant || '', qty });
    }
    saveCart(cart);
    renderCart();
  }

  function removeLine(index) {
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }

  function changeQty(index, delta) {
    const line = cart[index];
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) { removeLine(index); return; }
    saveCart(cart);
    renderCart();
  }

  function cartSubtotal() {
    return cart.reduce((sum, line) => {
      const p = PRODUCTS[line.productId];
      return sum + (p ? p.price * line.qty : 0);
    }, 0);
  }

  function cartCount() {
    return cart.reduce((sum, line) => sum + line.qty, 0);
  }

  /* ---------------------------- Kurv-rendering ---------------------------- */
  const cartItemsEl = qs('#cartItems');
  const cartEmptyEl = qs('#cartEmpty');
  const cartFooterEl = qs('#cartFooter');
  const cartBadgeEl = qs('#cartBadge');
  const cartHeaderCountEl = qs('#cartHeaderCount');
  const cartSubtotalEl = qs('#cartSubtotal');
  const progressFillEl = qs('#progressFill');
  const shippingMessageEl = qs('#shippingMessage');

  function renderCart() {
    const count = cartCount();
    cartBadgeEl.textContent = String(count);
    cartBadgeEl.hidden = count === 0;
    cartHeaderCountEl.textContent = '(' + count + ')';

    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
      cartEmptyEl.hidden = false;
      cartFooterEl.style.display = 'none';
    } else {
      cartEmptyEl.hidden = true;
      cartFooterEl.style.display = '';

      cart.forEach((line, index) => {
        const p = PRODUCTS[line.productId];
        if (!p) return;
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML =
          '<img class="cart-item-img" src="' + p.cardImage + '" alt="' + p.name + '">' +
          '<div class="cart-item-details">' +
            '<p class="cart-item-name">' + p.name + '</p>' +
            (line.variant ? '<p class="cart-item-variant">' + line.variant + '</p>' : '') +
            '<div class="cart-item-row">' +
              '<div class="cart-item-qty">' +
                '<button type="button" data-qty-minus aria-label="Reducér antal">−</button>' +
                '<span>' + line.qty + '</span>' +
                '<button type="button" data-qty-plus aria-label="Øg antal">+</button>' +
              '</div>' +
              '<span class="cart-item-price">' + formatKr(p.price * line.qty) + '</span>' +
            '</div>' +
            '<button type="button" class="cart-item-remove" data-remove>Fjern</button>' +
          '</div>';

        item.querySelector('[data-qty-minus]').addEventListener('click', () => changeQty(index, -1));
        item.querySelector('[data-qty-plus]').addEventListener('click', () => changeQty(index, 1));
        item.querySelector('[data-remove]').addEventListener('click', () => removeLine(index));

        cartItemsEl.appendChild(item);
      });
    }

    const subtotal = cartSubtotal();
    cartSubtotalEl.textContent = formatKr(subtotal);

    const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
    progressFillEl.style.width = pct + '%';
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      shippingMessageEl.textContent = 'Du har opnået fri fragt.';
    } else {
      shippingMessageEl.textContent = 'Du er ' + formatKr(FREE_SHIPPING_THRESHOLD - subtotal) + ' fra fri fragt.';
    }
  }

  /* ---------------------------- Overlays / fokushåndtering ---------------------------- */
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

  function lockScroll() { document.body.classList.add('no-scroll'); }
  function unlockScrollIfNoneOpen() {
    const anyOpen = qs('.cart-drawer.is-open') || qs('.product-modal.is-open') || qs('.search-overlay.is-open') || qs('.mobile-nav.is-open');
    if (!anyOpen) document.body.classList.remove('no-scroll');
  }

  /* ---------------------------- Kurv: åbn/luk ---------------------------- */
  const cartDrawer = qs('#cartDrawer');
  const cartOverlay = qs('#cartOverlay');

  function openCart() {
    lastFocused = document.activeElement;
    cartDrawer.classList.add('is-open');
    cartOverlay.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    lockScroll();
    qs('#cartCloseBtn').focus();
  }
  function closeCart() {
    cartDrawer.classList.remove('is-open');
    cartOverlay.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    unlockScrollIfNoneOpen();
    if (lastFocused) lastFocused.focus();
  }

  qs('#cartOpenBtn').addEventListener('click', openCart);
  qs('#cartCloseBtn').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  qs('#cartEmptyShopBtn').addEventListener('click', () => { closeCart(); document.getElementById('shop').scrollIntoView({ behavior: 'smooth' }); });
  cartDrawer.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); trapFocus(cartDrawer, e); });

  qs('#checkoutBtn').addEventListener('click', () => {
    showToast('Checkout er ikke tilkoblet i denne prototype endnu.');
  });

  /* ---------------------------- Toast ---------------------------- */
  const toastEl = qs('#toast');
  let toastTimer = null;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2800);
  }

  /* ---------------------------- Header scroll-adfærd ---------------------------- */
  const header = qs('#siteHeader');
  function onScrollHeader() {
    if (window.scrollY > 10) header.classList.add('is-fixed');
    else header.classList.remove('is-fixed');
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------------------- Mobilmenu ---------------------------- */
  const mobileNav = qs('#mobileNav');
  const mobileNavOverlay = qs('#mobileNavOverlay');

  function openMobileNav() {
    lastFocused = document.activeElement;
    mobileNav.classList.add('is-open');
    mobileNavOverlay.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    qs('#hamburgerBtn').setAttribute('aria-expanded', 'true');
    lockScroll();
    qs('#mobileNavClose').focus();
  }
  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    mobileNavOverlay.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    qs('#hamburgerBtn').setAttribute('aria-expanded', 'false');
    unlockScrollIfNoneOpen();
    if (lastFocused) lastFocused.focus();
  }

  qs('#hamburgerBtn').addEventListener('click', openMobileNav);
  qs('#mobileNavClose').addEventListener('click', closeMobileNav);
  mobileNavOverlay.addEventListener('click', closeMobileNav);
  mobileNav.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileNav(); trapFocus(mobileNav, e); });
  qsa('.mobile-nav-links a').forEach(a => a.addEventListener('click', closeMobileNav));
  qs('#mobileSearchBtn').addEventListener('click', () => { closeMobileNav(); setTimeout(openSearch, 300); });

  /* ---------------------------- Søgning ---------------------------- */
  const searchOverlay = qs('#searchOverlay');
  const searchInput = qs('#searchInput');
  const searchResultsEl = qs('#searchResults');

  function openSearch() {
    lastFocused = document.activeElement;
    searchOverlay.classList.add('is-open');
    searchOverlay.setAttribute('aria-hidden', 'false');
    lockScroll();
    searchInput.value = '';
    searchResultsEl.innerHTML = '';
    searchInput.focus();
  }
  function closeSearch() {
    searchOverlay.classList.remove('is-open');
    searchOverlay.setAttribute('aria-hidden', 'true');
    unlockScrollIfNoneOpen();
    if (lastFocused) lastFocused.focus();
  }

  qs('#searchOpenBtn').addEventListener('click', openSearch);
  qs('#searchCloseBtn').addEventListener('click', closeSearch);
  searchOverlay.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); trapFocus(searchOverlay, e); });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    searchResultsEl.innerHTML = '';
    if (!query) return;

    const matches = Object.values(PRODUCTS).filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );

    if (!matches.length) {
      searchResultsEl.innerHTML = '<p class="search-empty">Ingen produkter fundet for “' + searchInput.value + '”.</p>';
      return;
    }

    matches.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'search-result-item';
      btn.type = 'button';
      btn.innerHTML =
        '<img src="' + p.cardImage + '" alt="' + p.name + '">' +
        '<span><span class="search-result-name">' + p.name + '</span>' +
        '<span class="search-result-price">' + formatKr(p.price) + '</span></span>';
      btn.addEventListener('click', () => { closeSearch(); openProductModal(p.id); });
      searchResultsEl.appendChild(btn);
    });
  });

  /* ---------------------------- Produktmodal ---------------------------- */
  const productModal = qs('#productModal');
  const modalOverlay = qs('#modalOverlay');
  const modalMainImage = qs('#modalMainImage');
  const modalThumbs = qs('#modalThumbs');
  const modalCategory = qs('#modalCategory');
  const modalProductName = qs('#modalProductName');
  const modalRating = qs('#modalRating');
  const modalRatingValue = qs('#modalRatingValue');
  const modalPrice = qs('#modalPrice');
  const modalDescription = qs('#modalDescription');
  const modalVariantsWrap = qs('#modalVariants');
  const variantOptionsEl = qs('#variantOptions');
  const modalQtyValue = qs('#modalQtyValue');
  const modalUspsWrap = qs('#modalUspsWrap');
  const modalUspsEl = qs('#modalUsps');
  const modalAccordionEl = qs('#modalAccordion');
  const modalAddToBagBtn = qs('#modalAddToBag');

  let activeProduct = null;
  let activeVariant = null;
  let activeQty = 1;

  function openProductModal(productId) {
    const p = PRODUCTS[productId];
    if (!p) return;
    activeProduct = p;
    activeVariant = p.defaultVariant || null;
    activeQty = 1;

    modalCategory.textContent = p.category;
    modalProductName.textContent = p.name;
    modalPrice.textContent = formatKr(p.price);
    if (p.compareAtPrice) {
      modalPrice.innerHTML = formatKr(p.price) + ' <span style="text-decoration:line-through;color:var(--color-taupe);font-size:.85em;margin-left:.5em;">' + formatKr(p.compareAtPrice) + '</span>';
    }
    modalDescription.textContent = p.longDescription || p.description;

    if (p.rating) {
      modalRating.hidden = false;
      modalRatingValue.textContent = p.rating.toFixed(1);
    } else {
      modalRating.hidden = true;
    }

    // Galleri
    modalMainImage.src = p.images[0];
    modalMainImage.alt = p.name;
    modalThumbs.innerHTML = '';
    if (p.images.length > 1) {
      p.images.forEach((src, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = i === 0 ? 'is-active' : '';
        b.innerHTML = '<img src="' + src + '" alt="' + p.name + ' billede ' + (i + 1) + '">';
        b.addEventListener('click', () => {
          modalMainImage.src = src;
          qsa('button', modalThumbs).forEach(x => x.classList.remove('is-active'));
          b.classList.add('is-active');
        });
        modalThumbs.appendChild(b);
      });
    }

    // Varianter
    if (p.variants && p.variants.length) {
      modalVariantsWrap.hidden = false;
      variantOptionsEl.innerHTML = '';
      p.variants.forEach(v => {
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = v;
        if (v === activeVariant) b.classList.add('is-active');
        b.addEventListener('click', () => {
          activeVariant = v;
          qsa('button', variantOptionsEl).forEach(x => x.classList.remove('is-active'));
          b.classList.add('is-active');
        });
        variantOptionsEl.appendChild(b);
      });
    } else {
      modalVariantsWrap.hidden = true;
    }

    // Antal
    modalQtyValue.textContent = String(activeQty);

    // USP'er
    if (p.usps && p.usps.length) {
      modalUspsWrap.hidden = false;
      modalUspsEl.innerHTML = p.usps.map(u => '<li>' + u + '</li>').join('');
    } else {
      modalUspsWrap.hidden = true;
    }

    // Accordion
    modalAccordionEl.innerHTML = '';
    (p.accordion || []).forEach((section, i) => {
      const item = document.createElement('div');
      item.className = 'accordion-item';
      item.innerHTML =
        '<button type="button" class="accordion-trigger" aria-expanded="false">' +
          '<span>' + section.title + '</span><span class="accordion-icon">+</span>' +
        '</button>' +
        '<div class="accordion-panel"><div class="accordion-panel-inner"><p>' + section.content + '</p></div></div>';
      const trigger = item.querySelector('.accordion-trigger');
      const panel = item.querySelector('.accordion-panel');
      trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!isOpen));
        panel.style.maxHeight = isOpen ? '0px' : panel.scrollHeight + 'px';
      });
      modalAccordionEl.appendChild(item);
    });

    lastFocused = document.activeElement;
    productModal.classList.add('is-open');
    modalOverlay.classList.add('is-open');
    productModal.setAttribute('aria-hidden', 'false');
    lockScroll();
    qs('.modal-close', productModal).focus();
  }

  function closeProductModal() {
    productModal.classList.remove('is-open');
    modalOverlay.classList.remove('is-open');
    productModal.setAttribute('aria-hidden', 'true');
    unlockScrollIfNoneOpen();
    if (lastFocused) lastFocused.focus();
  }

  qs('#modalCloseBtn').addEventListener('click', closeProductModal);
  modalOverlay.addEventListener('click', closeProductModal);
  productModal.addEventListener('keydown', e => { if (e.key === 'Escape') closeProductModal(); trapFocus(productModal, e); });

  qs('#modalQtyMinus').addEventListener('click', () => {
    activeQty = Math.max(1, activeQty - 1);
    modalQtyValue.textContent = String(activeQty);
  });
  qs('#modalQtyPlus').addEventListener('click', () => {
    activeQty += 1;
    modalQtyValue.textContent = String(activeQty);
  });

  modalAddToBagBtn.addEventListener('click', () => {
    if (!activeProduct) return;
    addToCart(activeProduct.id, activeVariant, activeQty);
    closeProductModal();
    showToast(activeProduct.name + ' er lagt i kurven.');
    openCart();
  });

  /* ---------------------------- Produktkort: åbn modal + hurtig tilføj ---------------------------- */
  qsa('.product-card').forEach(card => {
    const id = card.getAttribute('data-product-id');
    const mediaBtn = qs('.product-card-media', card);
    mediaBtn.addEventListener('click', () => openProductModal(id));
  });

  qsa('[data-quick-add]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const id = el.getAttribute('data-quick-add');
      const p = PRODUCTS[id];
      if (!p) return;
      addToCart(id, p.defaultVariant || '', 1);
      showToast(p.name + ' er lagt i kurven.');
      openCart();
    });
  });

  /* ---------------------------- Hero-produkt CTA ---------------------------- */
  qsa('.js-open-product').forEach(btn => {
    btn.addEventListener('click', () => openProductModal(btn.getAttribute('data-product-id')));
  });

  /* ---------------------------- Sæt-CTA ---------------------------- */
  qs('#bundleAddBtn').addEventListener('click', () => {
    addToCart('saettet', '', 1);
    showToast('Søvnig Sættet er lagt i kurven.');
    openCart();
  });

  /* ---------------------------- Placeholder-links (footer m.m.) ---------------------------- */
  qsa('.js-stub').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      showToast(el.getAttribute('data-stub-message') || 'Denne side er ikke tilgængelig i denne prototype endnu.');
    });
  });

  /* ---------------------------- Nyhedsbrev ---------------------------- */
  const newsletterForm = qs('#newsletterForm');
  const newsletterMessage = qs('#newsletterMessage');
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = qs('#newsletterEmail');
    const email = emailInput.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      newsletterMessage.textContent = 'Indtast venligst en gyldig e-mailadresse.';
      return;
    }
    newsletterMessage.textContent = 'Du er tilmeldt. Velkommen til Søvnig.';
    newsletterForm.reset();
  });

  /* ---------------------------- Global Escape (fallback) ---------------------------- */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (productModal.classList.contains('is-open')) closeProductModal();
    else if (cartDrawer.classList.contains('is-open')) closeCart();
    else if (searchOverlay.classList.contains('is-open')) closeSearch();
    else if (mobileNav.classList.contains('is-open')) closeMobileNav();
  });

  /* ---------------------------- Scroll-reveal ---------------------------- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    qsa('.reveal').forEach(el => observer.observe(el));
  } else {
    qsa('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  /* ---------------------------- Init ---------------------------- */
  renderCart();

})();
