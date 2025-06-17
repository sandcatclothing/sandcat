// Manejo del input de comandos
function handleCommand(e) {
  if (e.key === "Enter") {
    const input = e.target.value.trim().toLowerCase();
    if (input === "paraloschavales") {
      document.querySelector(".secret-tag")?.classList.remove("hidden");
    } else if (["about", "contact", "collections", "shop", "cart"].includes(input)) {
      navigateTo(input);
    }
    e.target.value = "";
  }
}

// Navegación entre páginas
function navigateTo(page) {
  window.location.href = `${page}.html`;
}

// Alternar submenús (si aplica)
function toggleSubmenu(element) {
  const submenu = element.querySelector(".submenu");
  if (submenu) submenu.classList.toggle("hidden");
}

// Carrito: inicialización
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Agregar producto con talla al carrito
function addToCart(product, price, size) {
  if (!size || size === "Size") {
    alert("Please select a size.");
    return;
  }

  cart.push({ product, price, size });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product} (${size}) added to cart`);
}

// Actualizar número visual del carrito
function updateCartCount() {
  const count = cart.length;
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.innerText = count;
}

// Simulación de pago con PayPal
function simulatePaypal() {
  alert("Redirecting to PayPal...");
  localStorage.removeItem('cart');
  cart = [];
  if (document.getElementById('cart-items')) {
    document.getElementById('cart-items').innerHTML = "";
    document.getElementById('cart-total').innerText = "0";
  }
  updateCartCount();
}

// Vista previa de imagen
function previewImage(src) {
  const modal = document.getElementById("preview-modal");
  const img = document.getElementById("preview-img");
  if (modal && img) {
    modal.classList.remove("hidden");
    img.src = src;
  }
}

function closePreview() {
  const modal = document.getElementById("preview-modal");
  if (modal) modal.classList.add("hidden");
}

// Al cargar la página
window.onload = () => {
  updateCartCount();

  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");

  if (cartContainer && totalContainer) {
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      total += item.price;
      const div = document.createElement("div");
      div.innerText = `- ${item.product} (${item.size}): €${item.price}`;
      cartContainer.appendChild(div);
    });
    totalContainer.innerText = total;
  }
};

