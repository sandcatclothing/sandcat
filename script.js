const content = document.getElementById('content');
const terminalMenu = document.getElementById('terminal-menu');
const shopSubmenu = document.getElementById('shop-submenu');
const collectionsSubmenu = document.getElementById('collections-submenu');
const hamburger = document.getElementById('hamburger');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMsg = document.getElementById('newsletter-msg');

const productModal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalPrice = document.getElementById('modal-price');
const modalRarity = document.getElementById('modal-rarity');
const sizeSelect = document.getElementById('size-select');
const addToCartBtn = document.getElementById('add-to-cart');

const cart = document.getElementById('cart');
const cartClose = document.getElementById('cart-close');
const cartItemsList = document.getElementById('cart-items');

let products = [
  {
    id: 1,
    name: "CORE TEE",
    category: "tee",
    collection: "coredrop",
    image: "assets/core_tee.png",
    price: 30,
    rarity: "CORE DROP",
  },
  {
    id: 2,
    name: "CORE HOODIE",
    category: "hoodie",
    collection: "coredrop",
    image: "assets/core_hoodie.png",
    price: 55,
    rarity: "CORE DROP",
  },
  {
    id: 3,
    name: "SANDCAT CAP",
    category: "accessory",
    collection: "",
    image: "assets/cap.png",
    price: 15,
    rarity: "",
  }
];

let cartItems = [];

// Show / hide terminal menu
hamburger.addEventListener('click', () => {
  if (terminalMenu.classList.contains('hidden')) {
    terminalMenu.classList.remove('hidden');
  } else {
    terminalMenu.classList.add('hidden');
    hideAllSubmenus();
  }
});

function hideAllSubmenus() {
  shopSubmenu.classList.add('hidden');
  collectionsSubmenu.classList.add('hidden');
}

// Menu click handler
terminalMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('menu-item')) {
    hideAllSubmenus();
    const section = e.target.dataset.section;
    if (section === 'shop') {
      shopSubmenu.classList.remove('hidden');
      content.innerHTML = '';
    } else if (section === 'collections') {
      collectionsSubmenu.classList.remove('hidden');
      content.innerHTML = '';
    } else if (section === 'about') {
      terminalMenu.classList.add('hidden');
      content.innerHTML = `<p>Sandcat is an urban streetwear brand with attitude and style. Breaking the mold since 2025.</p>`;
    } else if (section === 'contact') {
      terminalMenu.classList.add('hidden');
      content.innerHTML = `<p>Contact us at contact@sandcat.com</p>`;
    }
  } else if (e.target.classList.contains('submenu-item')) {
    // Submenu clicked: Filter products or show collection
    if (e.target.parentElement.id === 'shop-submenu') {
      let filter = e.target.dataset.filter;
      showProducts(filter);
    } else if (e.target.parentElement.id === 'collections-submenu') {
      let collection = e.target.dataset.collection;
      showCollection(collection);
    }
  }
});

// Show products filtered by category
function showProducts(filter) {
  let filteredProducts = [];
  if (filter === 'all') filteredProducts = products;
  else filteredProducts = products.filter(p => p.category === filter);

  content.innerHTML = '';
  filteredProducts.forEach(prod => {
    let prodDiv = document.createElement('div');
    prodDiv.classList.add('product');
    prodDiv.dataset.id = prod.id;
    prodDiv.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <p>$${prod.price.toFixed(2)}</p>
      ${prod.rarity ? `<p class="coredrop">${prod.rarity}</p>` : ''}
    `;
    content.appendChild(prodDiv);

    prodDiv.addEventListener('click', () => openProductModal(prod.id));
  });
}

// Show collection (just same as filtered products by collection)
function showCollection(name) {
  const filtered = products.filter(p => p.collection.toLowerCase() === name.toLowerCase());
  content.innerHTML = '';
  filtered.forEach(prod => {
    let prodDiv = document.createElement('div');
    prodDiv.classList.add('product');
    prodDiv.dataset.id = prod.id;
    prodDiv.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <p>$${prod.price.toFixed(2)}</p>
      ${prod.rarity ? `<p class="coredrop">${prod.rarity}</p>` : ''}
    `;
    content.appendChild(prodDiv);

    prodDiv.addEventListener('click', () => openProductModal(prod.id));
  });
}

// Product modal open
function openProductModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  modalImage.src = product.image;
  modalName.textContent = product.name;
  modalPrice.textContent = `$${product.price.toFixed(2)}`;
  modalRarity.textContent = product.rarity || '';
  sizeSelect.value = '';
  productModal.classList.remove('hidden');
}

// Close modal
modalClose.addEventListener('click', () => {
  productModal.classList.add('hidden');
});

// Add to cart
addToCartBtn.addEventListener('click', () => {
  const selectedSize = sizeSelect.value;
  if (!selectedSize) {
    alert("Please select a size!");
    return;
  }

  const prodName = modalName.textContent;
  const prodPrice = parseFloat(modalPrice.textContent.replace('$', ''));

  const item = { name: prodName, size: selectedSize, price: prodPrice };
  cartItems.push(item);
  updateCartUI();

  alert(`${prodName} (${selectedSize}) added to cart!`);
  productModal.classList.add('hidden');
  terminalMenu.classList.add('hidden');
});

// Update cart UI
function updateCartUI() {
  if (cartItems.length === 0) {
    cart.classList.add('hidden');
    return;
  }

  cart.classList.remove('hidden');
  cartItemsList.innerHTML = '';
  cartItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} (${item.size}) - $${item.price.toFixed(2)}`;
    cartItemsList.appendChild(li);
  });
}

// Close cart
cartClose.addEventListener('click', () => {
  cart.classList.add('hidden');
});

// Newsletter form submit
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = newsletterForm.email.value.trim();
  if (!email || !email.includes('@')) {
    newsletterMsg.textContent = 'Please enter a valid email.';
    return;
  }
  newsletterMsg.textContent = 'Thanks for subscribing!';
  newsletterForm.reset();
});

// Animation hackeo
const animationDuration = 2500; // reduce animation duration
const animationChars = '01A9CDEFHJLMNOPRSTUXZ'.split('');
const animationRows = 10;
const animationCols = 40;

function createAnimation() {
  content.classList.add('hack-animation');
  let animationHTML = '';

  for (let r = 0; r < animationRows; r++) {
    for (let c = 0; c < animationCols; c++) {
      const char = animationChars[Math.floor(Math.random() * animationChars.length)];
      animationHTML += `<span class="hacker-char">${char}</span>`;
    }
    animationHTML += '<br/>';
  }

  content.innerHTML = animationHTML;

  // Clear animation after duration
  setTimeout(() => {
    content.classList.remove('hack-animation');
    content.innerHTML = `<p>Welcome to Sandcat Store</p>`;
  }, animationDuration);
}

// On load, start animation
window.addEventListener('load', () => {
  createAnimation();
});

