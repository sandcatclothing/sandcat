/* ===== Navegación consola / comandos ===== */
function handleCommand(e) {
  if (e.key === "Enter") {
    const input = e.target.value.trim().toLowerCase();
    if (input === "paraloschavales") {
      document.querySelector(".secret-tag")?.classList.remove("hidden");
    } else if (
      input === "about" || input === "contact" ||
      input === "collections" || input === "shop" || input === "cart"
    ) {
      navigateTo(input);
    }
    e.target.value = "";
  }
}

function navigateTo(page) {
  window.location.href = `${page}.html`;
}

function toggleMenu() {
  const menu = document.getElementById("console-menu");
  menu?.classList.toggle("hidden");
}

/* Submenú (lo llama index.html) */
function toggleSubmenu() {
  const sub = document.querySelector(".submenu");
  if (!sub) return;
  sub.classList.toggle("hidden");
}

/* ===== Carrito ===== */
function toggleCart() {
  const cartModal = document.getElementById("cart-modal");
  if (!cartModal) return; // páginas sin modal
  cartModal.classList.toggle("hidden");
  renderCartModal();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.length;
  const countEls = document.querySelectorAll('#cart-count, .cart-count');
  countEls.forEach(el => el && (el.textContent = count));
}

/* addToCart compatible con (name, price) o (name, price, size) */
function addToCart(product, price, size) {
  const finalSize = size || 'N/A';
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ product, price, size: finalSize });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function renderCartModal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    const priceStr = typeof item.price === 'number' ? item.price.toFixed(2) : item.price;
    div.innerText = `- ${item.product} (${item.size || 'N/A'}): €${priceStr}`;
    container.appendChild(div);
    total += Number(item.price) || 0;
  });

  if (totalEl.tagName === 'SPAN') totalEl.textContent = (Math.round(total*100)/100).toFixed(2);
  else totalEl.innerText = `Total: €${(Math.round(total*100)/100).toFixed(2)}`;
}

/* Pago simulado */
function simulatePaypal() {
  alert("Redirecting to PayPal...");
  localStorage.removeItem('cart');

  const items = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  if (items) items.innerHTML = "";
  if (total) {
    if (total.tagName === 'SPAN') total.textContent = "0.00";
    else total.innerText = "Total: €0.00";
  }
  updateCartCount();
}

function checkout() {
  simulatePaypal();
  const cartModal = document.getElementById("cart-modal");
  if (cartModal && !cartModal.classList.contains('hidden')) {
    cartModal.classList.add('hidden');
  }
}

/* ===== Factura (last_order) ===== */
function generateOrderId() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SC-${y}${m}${day}-${rand}`;
}
function calcTotal(items=[]) {
  return (items.reduce((s, it) => s + (Number(it.price)||0), 0)).toFixed(2);
}
function persistOrderFromCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.length) return null;

  const order = {
    orderId: generateOrderId(),
    createdAt: new Date().toISOString(),
    currency: 'EUR',
    items: cart.map(it => ({
      name: it.product || it.name || 'Product',
      size: it.size || 'N/A',
      price: Number(it.price) || 0
    })),
    total: calcTotal(cart),
    customer: {
      name: '',
      email: '',
      address: '',
      vatid: ''
    }
  };
  localStorage.setItem('last_order', JSON.stringify(order));
  return order;
}
function checkoutAndThanks(){
  persistOrderFromCart();
  simulatePaypal();
  const cartModal = document.getElementById("cart-modal");
  if (cartModal && !cartModal.classList.contains('hidden')) {
    cartModal.classList.add('hidden');
  }
  setTimeout(()=> { window.location.href = 'thanks.html'; }, 600);
}

/* ===== Preview opcional ===== */
function previewImage(src) {
  const modal = document.getElementById("preview-modal");
  const img = document.getElementById("preview-img");
  if (!modal || !img) return;
  modal.classList.remove("hidden");
  img.src = src;
}
function closePreview() {
  document.getElementById("preview-modal")?.classList.add("hidden");
}

/* ===== Hack intro ===== */
function startHackAnimation() {
  const hackScreen = document.getElementById("hack-screen");
  const hackText = document.getElementById("hack-text");
  if (hackScreen && hackText) {
    hackText.innerHTML = '<span class="glitch-text">ACCESS GRANTED</span>';
    setTimeout(() => {
      hackScreen.style.opacity = "0";
      setTimeout(() => {
        hackScreen.style.display = "none";
      }, 300);
    }, 700);
  }
}

/* ===== Init ===== */
window.onload = () => {
  updateCartCount();
  startHackAnimation();

  // Si estamos en cart.html, rellenar totales y líneas
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");

  if (cartItemsContainer && cartTotalEl) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
      const div = document.createElement("div");
      const priceStr = typeof item.price === 'number' ? item.price.toFixed(2) : item.price;
      div.innerText = `- ${item.product} (${item.size || 'N/A'}): €${priceStr}`;
      cartItemsContainer.appendChild(div);
      total += Number(item.price) || 0;
    });

    if (cartTotalEl.tagName === 'SPAN') cartTotalEl.textContent = (Math.round(total*100)/100).toFixed(2);
    else cartTotalEl.innerText = `Total: €${(Math.round(total*100)/100).toFixed(2)}`;
  }
};
