
function handleCommand(e) {
  if (e.key === "Enter") {
    const input = e.target.value.trim().toLowerCase();
    if (input === "paraloschavales") {
      document.querySelector(".secret-tag").classList.remove("hidden");
    } else if (input === "about" || input === "contact" || input === "collections" || input === "shop" || input === "cart") {
      navigateTo(input);
    }
    e.target.value = "";
  }
}

function toggleSubmenu(element) {
  const submenu = element.querySelector(".submenu");
  if (submenu) submenu.classList.toggle("hidden");
}

function navigateTo(page) {
  window.location.href = `${page}.html`;
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, price) {
  cart.push({ product, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(product + " added to cart");
}

function simulatePaypal() {
  alert("Redirecting to PayPal...");
  localStorage.removeItem('cart');
  document.getElementById('cart-items').innerHTML = "";
  document.getElementById('cart-total').innerText = "0";
}

window.onload = () => {
  if (document.getElementById("cart-items")) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    const container = document.getElementById("cart-items");
    cartItems.forEach(item => {
      total += item.price;
      const div = document.createElement("div");
      div.innerText = `- ${item.product}: €${item.price}`;
      container.appendChild(div);
    });
    document.getElementById("cart-total").innerText = total;
  }
};

function addToCart(product, price, size) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ product, price, size });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(product + " (" + size + ") added to cart");
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let count = cart.length;
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.innerText = count;
}

function previewImage(src) {
  document.getElementById("preview-modal").classList.remove("hidden");
  document.getElementById("preview-img").src = src;
}

function closePreview() {
  document.getElementById("preview-modal").classList.add("hidden");
}

window.onload = () => {
  updateCartCount();
  if (document.getElementById("cart-items")) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    const container = document.getElementById("cart-items");
    cartItems.forEach(item => {
      total += item.price;
      const div = document.createElement("div");
      div.innerText = `- ${item.product} (${item.size}): €${item.price}`;
      container.appendChild(div);
    });
    document.getElementById("cart-total").innerText = total;
  }
};
