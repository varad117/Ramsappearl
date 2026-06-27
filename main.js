(function () {
  'use strict';

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ===== HAMBURGER DRAWER =====
  const hamburger  = document.getElementById('hamburger');
  const navDrawer  = document.getElementById('navDrawer');
  const navOverlay = document.getElementById('navOverlay');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    if (!navDrawer) return;
    navDrawer.classList.add('open');
    hamburger && hamburger.classList.add('open');
    navOverlay && navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!navDrawer) return;
    navDrawer.classList.remove('open');
    hamburger && hamburger.classList.remove('open');
    navOverlay && navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', () => {
    navDrawer && navDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (navOverlay)  navOverlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ===== PRODUCT MODAL CLOSE =====
  const productModal      = document.getElementById('productModal');
  const productModalClose = document.getElementById('productModalClose');

  if (productModalClose) {
    productModalClose.addEventListener('click', () => productModal.classList.remove('active'));
  }
  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) productModal.classList.remove('active');
    });
  }

  // ===== ORDER MODAL (Name → WhatsApp) =====
  const orderModal      = document.getElementById('orderModal');
  const orderModalClose = document.getElementById('orderModalClose');
  const orderSubmit     = document.getElementById('orderSubmit');
  const orderError      = document.getElementById('orderError');
  let currentOrderProduct = '';

  window.openOrderModal = function (productName) {
    currentOrderProduct = productName || '';
    const label = document.getElementById('orderProductLabel');
    if (label) {
      label.textContent = productName
        ? 'Ordering: ' + productName + ' — enter your name to continue'
        : 'Enter your name to continue on WhatsApp';
    }
    const nameEl = document.getElementById('orderName');
    const qtyEl  = document.getElementById('orderQty');
    if (nameEl) nameEl.value = '';
    if (qtyEl)  qtyEl.value  = '';
    if (orderError) orderError.textContent = '';
    if (orderModal) orderModal.classList.add('active');
  };

  if (orderModalClose) {
    orderModalClose.addEventListener('click', () => orderModal && orderModal.classList.remove('active'));
  }
  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) orderModal.classList.remove('active');
    });
  }

  if (orderSubmit) {
    orderSubmit.addEventListener('click', () => {
      const name = (document.getElementById('orderName').value || '').trim();
      const qty  = (document.getElementById('orderQty').value  || '').trim();

      if (!name) {
        if (orderError) orderError.textContent = 'Please enter your name to continue.';
        return;
      }

      const number = window.WHATSAPP_NUMBER || '919876543210';
      let message = "Hi, I'm " + name + ".";
      if (currentOrderProduct) message += " I'm interested in: " + currentOrderProduct + ".";
      if (qty) message += " Quantity needed: " + qty + ".";
      message += " Please share more details.";

      const url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
      if (orderModal) orderModal.classList.remove('active');
      window.open(url, '_blank');
    });
  }

  ['orderName', 'orderQty'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && orderSubmit) orderSubmit.click();
    });
  });

  // ===== FILTER BUTTONS =====
  function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards      = document.querySelectorAll('.product-card');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        cards.forEach(function (card) {
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.display = show ? '' : 'none';
          if (show) card.style.animation = 'fadeIn 0.3s ease';
        });
      });
    });
  }
  window.setupFilters = setupFilters;

  // ===== CONTACT FORM → WHATSAPP =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = (document.getElementById('cfName').value    || '').trim();
      const phone   = (document.getElementById('cfPhone').value   || '').trim();
      const product = (document.getElementById('cfProduct').value || '');
      const msg     = (document.getElementById('cfMessage').value || '').trim();

      if (!name || !phone) return;

      const number = window.WHATSAPP_NUMBER || '919876543210';
      let message = "Hi, I'm " + name + " (Phone: " + phone + ").";
      if (product) message += " Interested in: " + product + ".";
      if (msg)     message += " Message: " + msg;

      const url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
      window.open(url, '_blank');
      contactForm.reset();
    });
  }

  // ===== SCROLL REVEAL =====
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .stat-card, .feature, .cd-item').forEach(function (el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });

  // Fade-in keyframe
  const kfStyle = document.createElement('style');
  kfStyle.textContent = '@keyframes fadeIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }';
  document.head.appendChild(kfStyle);

})();
