/* ==========================================================================
   SØVNIG — predictive-search.js
   Rigtig Shopify Predictive Search (/search/suggest.json). Ingen
   hardcoded produktliste — resultaterne kommer direkte fra Shopify.
   ========================================================================== */

(function () {
  'use strict';

  const qs = (sel, ctx) => (ctx || document).querySelector(sel);
  const searchInput = qs('#searchInput');
  const searchResultsEl = qs('#searchResults');
  if (!searchInput || !searchResultsEl) return;

  const routes = (window.Sovnig && window.Sovnig.routes) || {};
  const strings = (window.Sovnig && window.Sovnig.strings) || {};
  const suggestUrl = (routes.predictiveSearchUrl || '/search/suggest') + '.json';

  let debounceTimer = null;
  let activeController = null;

  function renderResults(products, query) {
    searchResultsEl.innerHTML = '';

    if (!products.length) {
      const template = strings.noResultsTemplate || 'Ingen produkter fundet for "%%TERMS%%".';
      searchResultsEl.innerHTML = '<p class="search-empty">' + template.replace('%%TERMS%%', query) + '</p>';
      return;
    }

    products.forEach(product => {
      const image = product.image || (product.featured_image && product.featured_image.url) || '';
      const price = product.price || product.price_min || '';

      const a = document.createElement('a');
      a.className = 'search-result-item';
      a.href = product.url;
      a.innerHTML =
        (image ? '<img src="' + image + '" alt="' + (product.title || '') + '" width="56" height="64" loading="lazy">' : '') +
        '<span><span class="search-result-name">' + product.title + '</span>' +
        (price ? '<span class="search-result-price">' + price + '</span>' : '') +
        '</span>';
      searchResultsEl.appendChild(a);
    });
  }

  function performSearch(query) {
    if (activeController) activeController.abort();
    activeController = new AbortController();

    const url = suggestUrl + '?q=' + encodeURIComponent(query) +
      '&resources[type]=product&resources[limit]=8&resources[options][unavailable_products]=last';

    fetch(url, { signal: activeController.signal })
      .then(res => res.json())
      .then(data => {
        const products = (data.resources && data.resources.results && data.resources.results.products) || [];
        renderResults(products, query);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          searchResultsEl.innerHTML = '';
        }
      });
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    clearTimeout(debounceTimer);
    if (!query) {
      searchResultsEl.innerHTML = '';
      return;
    }
    debounceTimer = setTimeout(() => performSearch(query), 220);
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && routes.searchUrl) {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) window.location.href = routes.searchUrl + '?q=' + encodeURIComponent(query) + '&type=product';
    }
  });
})();
