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
  menu.classList.toggle("hidden");
}

function toggleCart() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.classList.toggle("hidden");
  renderCartModal();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.length;
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.innerText = count;
}

function addToCart(product, price, size) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ product, price, size });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product} (${size}) added to cart`);
}

function renderCartModal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerText = `- ${item.product} (${item.size}): €${item.price}`;
    container.appendChild(div);
    total += item.price;
  });

  totalEl.innerText = `Total: €${total}`;
}

function simulatePaypal() {
  alert("Redirecting to PayPal...");
  localStorage.removeItem('cart');
  document.getElementById('cart-items').innerHTML = "";
  document.getElementById('cart-total').innerText = "0";
  updateCartCount();
}

function checkout() {
  simulatePaypal();
  toggleCart();
}

function previewImage(src) {
  const modal = document.getElementById("preview-modal");
  const img = document.getElementById("preview-img");
  modal.classList.remove("hidden");
  img.src = src;
}

function closePreview() {
  document.getElementById("preview-modal").classList.add("hidden");
}

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

window.onload = () => {
  updateCartCount();
  startHackAnimation();

  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");

  if (cartItemsContainer && cartTotalEl) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach(item => {
      const div = document.createElement("div");
      div.innerText = `- ${item.product} (${item.size}): €${item.price}`;
      cartItemsContainer.appendChild(div);
      total += item.price;
    });

    cartTotalEl.innerText = total;
  }
};


