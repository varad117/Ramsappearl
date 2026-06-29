(function () {
  'use strict';

  // ── NAVBAR SCROLL ───────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ── HAMBURGER DRAWER ────────────────────────────────────
  var hamburger   = document.getElementById('hamburger');
  var navDrawer   = document.getElementById('navDrawer');
  var navOverlay  = document.getElementById('navOverlay');
  var drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    if (!navDrawer) return;
    navDrawer.classList.add('open');
    if (hamburger)  hamburger.classList.add('open');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!navDrawer) return;
    navDrawer.classList.remove('open');
    if (hamburger)  hamburger.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger)   hamburger.addEventListener('click',   function () { navDrawer.classList.contains('open') ? closeDrawer() : openDrawer(); });
  if (drawerClose) drawerClose.addEventListener('click',  closeDrawer);
  if (navOverlay)  navOverlay.addEventListener('click',   closeDrawer);
  document.querySelectorAll('.drawer-link, .drawer-whatsapp').forEach(function (el) { el.addEventListener('click', closeDrawer); });

  // ── AUTH MODAL ──────────────────────────────────────────
  var authModal      = document.getElementById('authModal');
  var authModalClose = document.getElementById('authModalClose');
  if (authModalClose) authModalClose.addEventListener('click', function () { authModal.classList.remove('active'); });
  if (authModal)      authModal.addEventListener('click',      function (e) { if (e.target === authModal) authModal.classList.remove('active'); });

  window.switchAuthTab = function (tab) {
    document.getElementById('authLoginPanel').classList.toggle('hidden',  tab !== 'login');
    document.getElementById('authSignupPanel').classList.toggle('hidden', tab !== 'signup');
    document.getElementById('tabLogin').classList.toggle('active',  tab === 'login');
    document.getElementById('tabSignup').classList.toggle('active', tab === 'signup');
  };

  window.togglePwd = function (inputId, btn) {
    var input = document.getElementById(inputId);
    if (!input) return;
    var isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    btn.innerHTML = isText ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
  };

  // ── PRODUCT MODAL CLOSE ─────────────────────────────────
  var productModal      = document.getElementById('productModal');
  var productModalClose = document.getElementById('productModalClose');
  if (productModalClose) productModalClose.addEventListener('click', function () { productModal.classList.remove('active'); });
  if (productModal)      productModal.addEventListener('click',      function (e) { if (e.target === productModal) productModal.classList.remove('active'); });

  // ── ORDER MODAL (Name → WhatsApp) ───────────────────────
  var orderModal      = document.getElementById('orderModal');
  var orderModalClose = document.getElementById('orderModalClose');
  var orderSubmit     = document.getElementById('orderSubmit');
  var orderError      = document.getElementById('orderError');
  var currentProduct  = '';

  window.openOrderModal = function (productName) {
    currentProduct = productName || '';
    var label = document.getElementById('orderProductLabel');
    if (label) label.textContent = productName ? 'Ordering: ' + productName : 'Enter your details to continue';
    var n = document.getElementById('orderName');
    var q = document.getElementById('orderQty');
    var c = document.getElementById('orderColour');
    if (n) n.value = ''; if (q) q.value = ''; if (c) c.value = '';
    if (orderError) orderError.textContent = '';
    if (orderModal) orderModal.classList.add('active');
  };

  if (orderModalClose) orderModalClose.addEventListener('click', function () { orderModal.classList.remove('active'); });
  if (orderModal)      orderModal.addEventListener('click',      function (e) { if (e.target === orderModal) orderModal.classList.remove('active'); });

  if (orderSubmit) {
    orderSubmit.addEventListener('click', function () {
      var name   = (document.getElementById('orderName').value   || '').trim();
      var qty    = (document.getElementById('orderQty').value    || '').trim();
      var colour = (document.getElementById('orderColour').value || '').trim();
      if (!name) { orderError.textContent = 'Please enter your name.'; return; }
      var number  = window.WHATSAPP_NUMBER || '918830519947';
      var message = "Hi, I'm " + name + ".";
      if (currentProduct) message += " I'm interested in: *" + currentProduct + "*.";
      if (qty)    message += " Quantity: " + qty + ".";
      if (colour) message += " Preferred colour: " + colour + ".";
      message += " Please share more details.";
      orderModal.classList.remove('active');
      window.open('https://wa.me/' + number + '?text=' + encodeURIComponent(message), '_blank');
    });
  }

  ['orderName','orderQty','orderColour'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('keydown', function (e) { if (e.key === 'Enter' && orderSubmit) orderSubmit.click(); });
  });

  // ── FILTER BUTTONS ──────────────────────────────────────
  window.setupFilters = function () {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var cards      = document.querySelectorAll('.product-card');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.dataset.filter;
        cards.forEach(function (card) {
          var show = filter === 'all' || card.dataset.category === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  };

  // ── CONTACT FORM → WHATSAPP ─────────────────────────────
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = (document.getElementById('cfName').value    || '').trim();
      var phone   = (document.getElementById('cfPhone').value   || '').trim();
      var product = (document.getElementById('cfProduct').value || '');
      var msg     = (document.getElementById('cfMessage').value || '').trim();
      if (!name || !phone) return;
      var number  = window.WHATSAPP_NUMBER || '918830519947';
      var message = "Hi, I'm " + name + " (Ph: " + phone + ").";
      if (product) message += " Interested in: *" + product + "*.";
      if (msg)     message += " Details: " + msg;
      window.open('https://wa.me/' + number + '?text=' + encodeURIComponent(message), '_blank');
      contactForm.reset();
    });
  }

  // ── SCROLL REVEAL ────────────────────────────────────────
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .why-card, .feature, .cd-item').forEach(function (el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObs.observe(el);
  });

})();
