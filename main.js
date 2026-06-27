// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger && hamburger.classList.remove('open');
  });
});

// ===== PRODUCT MODAL CLOSE =====
const productModal = document.getElementById('productModal');
const productModalClose = document.getElementById('productModalClose');
if (productModalClose) {
  productModalClose.addEventListener('click', () => productModal.classList.remove('active'));
}
if (productModal) {
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) productModal.classList.remove('active');
  });
}

// ===== ORDER MODAL (Name -> WhatsApp) =====
const orderModal = document.getElementById('orderModal');
const orderModalClose = document.getElementById('orderModalClose');
const orderSubmit = document.getElementById('orderSubmit');
const orderError = document.getElementById('orderError');
let currentOrderProduct = '';

window.openOrderModal = function(productName) {
  currentOrderProduct = productName || '';
  const label = document.getElementById('orderProductLabel');
  label.textContent = productName
    ? `Ordering: ${productName} — enter your name to continue`
    : 'Enter your name to continue on WhatsApp';
  document.getElementById('orderName').value = '';
  document.getElementById('orderQty').value = '';
  orderError.textContent = '';
  orderModal.classList.add('active');
};

if (orderModalClose) {
  orderModalClose.addEventListener('click', () => orderModal.classList.remove('active'));
}
if (orderModal) {
  orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) orderModal.classList.remove('active');
  });
}

if (orderSubmit) {
  orderSubmit.addEventListener('click', () => {
    const name = document.getElementById('orderName').value.trim();
    const qty = document.getElementById('orderQty').value.trim();

    if (!name) {
      orderError.textContent = 'Please enter your name to continue.';
      return;
    }

    const number = window.WHATSAPP_NUMBER || '919876543210';
    let message = `Hi, I'm ${name}.`;
    if (currentOrderProduct) message += ` I'm interested in: ${currentOrderProduct}.`;
    if (qty) message += ` Quantity needed: ${qty}.`;
    message += ` Please share more details.`;

    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    orderModal.classList.remove('active');
    window.open(url, '_blank');
  });
}

// Allow Enter key on order form
['orderName', 'orderQty'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') orderSubmit?.click();
  });
});

// ===== FILTER BUTTONS =====
function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
window.setupFilters = setupFilters;

// ===== "Order This" buttons on product cards (View Details already opens product modal;
// this wires the View Details -> WhatsApp path is inside the product modal markup itself) =====

// ===== CONTACT FORM -> WHATSAPP =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cfName').value.trim();
    const phone = document.getElementById('cfPhone').value.trim();
    const product = document.getElementById('cfProduct').value;
    const msg = document.getElementById('cfMessage').value.trim();

    if (!name || !phone) return;

    const number = window.WHATSAPP_NUMBER || '919876543210';
    let message = `Hi, I'm ${name} (Phone: ${phone}).`;
    if (product) message += ` Interested in: ${product}.`;
    if (msg) message += ` Message: ${msg}`;

    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    contactForm.reset();
  });
}

// ===== SMOOTH REVEAL ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .stat-card, .feature, .cd-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Fade in animation
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }`;
document.head.appendChild(style);