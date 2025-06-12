const content = document.getElementById("content");
const input = document.getElementById("command");
const terminalMenu = document.getElementById("terminal-menu");
const menuIcon = document.getElementById("menu-icon");
const productModal = document.getElementById("product-modal");
const productDetails = document.getElementById("product-details");
const closeModalBtn = document.getElementById("close-modal");

// Productos ejemplo CORE DROP
const products = {
  core_drop: [
    { 
      id: 'core_tee_founders',
      name: "CORE TEE FOUNDERS", 
      image: "assets/core_tee.png", 
      price: "29.99 €", 
      rarity: "core-drop",
      category: "tee"
    },
    { 
      id: 'core_hoodie_founders',
      name: "CORE HOODIE FOUNDERS", 
      image: "assets/core_hoodie.png", 
      price: "49.99 €", 
      rarity: "core-drop",
      category: "hoodie"
    }
  ],
  shop: [
    // Puedes ampliar productos aquí o separarlos por categoría en el futuro
  ]
};

let currentSection = null;

// Animación hacker inicial
function hackerAnimation() {
  const body = document.body;
  let frames = 0;
  const maxFrames = 120; // duración en frames (~4 seg a 30fps)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  body.style.backgroundColor = "#000";
  body.style.color = "#0f0";

  const animDiv = document.createElement("div");
  animDiv.style.position = "fixed";
  animDiv.style.top = 0;
  animDiv.style.left = 0;
  animDiv.style.width = "100vw";
  animDiv.style.height = "100vh";
  animDiv.style.backgroundColor = "#000";
  animDiv.style.color = "#0f0";
  animDiv.style.fontFamily = "'Courier New', monospace";
  animDiv.style.fontSize = "20px";
  animDiv.style.whiteSpace = "pre";
  animDiv.style.padding = "20px";
  animDiv.style.zIndex = 9999;
  animDiv.style.overflow = "hidden";
  document.body.appendChild(animDiv);

  function randomString(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function frame() {
    if (frames > maxFrames) {
      document.body.removeChild(animDiv);
      body.style.backgroundColor = "#000";
      body.style.color = "#00ff00";
      // Mostrar isla y menú
      document.getElementById("header").style.display = "flex";
      terminalMenu.classList.add("hidden");
      return;
    }
    // Rellenar líneas con random chars
    let lines = "";
    for (let i = 0; i < 25; i++) {
      lines += randomString(80) + "\n";
    }
    animDiv.textContent = lines;
    frames++;
    requestAnimationFrame(frame);
  }
  frame();
}

// Renderizar sección
function renderSection(section) {
  currentSection = section;
  content.innerHTML = "";

  if (section === "shop") {
    renderShop();
  } else if (section === "collections") {
    renderCollections();
  } else if (section === "about") {
    content.textContent = "Welcome to SANDCAT! This is the ABOUT section.";
  } else if (section === "newsletter") {
    content.textContent = "Subscribe to our newsletter (Coming soon).";
  }
}

// Render Shop con filtro desplegable
function renderShop() {
  // filtro dropdown
  const filterDiv = document.createElement("div");
  filterDiv.style.marginBottom = "15px";

  const select = document.createElement("select");
  select.id = "shop-filter";

  ["view all", "tee", "hoodies", "accessories"].forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat.toLowerCase();
    opt.textContent = cat.toUpperCase();
    select.appendChild(opt);
  });

  filterDiv.appendChild(select);
  content.appendChild(filterDiv);

  function showProductsByCategory(category) {
    // limpiar productos previos
    const prevProducts = content.querySelectorAll(".product");
    prevProducts.forEach(p => p.remove());

    // filtrar
    let toShow = [];
    if (category === "view all") {
      toShow = [...products.core_drop]; // aquí puedes añadir todos productos shop también
    } else {
      toShow = products.core_drop.filter(p => p.category === category);
    }

    if (toShow.length === 0) {
      const noMsg = document.createElement("p");
      noMsg.textContent = "No products found in this category.";
      noMsg.style.color = "#f00";
      content.appendChild(noMsg);
      return;
    }

    toShow.forEach(product => {
      const div = createProductCard(product);
      content.appendChild(div);
    });
  }

  showProductsByCategory("view all");

  select.addEventListener("change", e => {
    showProductsByCategory(e.target.value);
  });
}

// Render Collections
function renderCollections() {
  content.innerHTML = "<h2>CORE DROP COLLECTION</h2>";
  products.core_drop.forEach(p => {
    const div = createProductCard(p);
    content.appendChild(div);
  });
}

function createProductCard(product) {
  const div = document.createElement("div");
  div.classList.add("product");
  if(product.rarity) div.classList.add(product.rarity);

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  div.appendChild(img);

  const name = document.createElement("strong");
  name.textContent = product.name;
  div.appendChild(name);

  const price = document.createElement("span");
  price.textContent = product.price;
  div.appendChild(price);

  div.addEventListener("click", () => {
    openProductModal(product);
  });

  return div;
}

function openProductModal(product) {
  productDetails.innerHTML = "";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  productDetails.appendChild(img);

  const name = document.createElement("strong");
  name.textContent = product.name;
  productDetails.appendChild(name);

  const price = document.createElement("span");
  price.textContent = "Price: " + product.price;
  productDetails.appendChild(price);

  // Selector tallas
  const sizes = ["XS", "S", "M", "L", "XL"];
  const sizeSelector = document.createElement("div");
  sizeSelector.classList.add("size-selector");

  let selectedSize = null;

  sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.textContent = size;
    btn.addEventListener("click", () => {
      selectedSize = size;
      // deseleccionar todos
      sizeSelector.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    sizeSelector.appendChild(btn);
  });

  productDetails.appendChild(sizeSelector);

  // Botón comprar
  const buyBtn = document.createElement("button");
  buyBtn.id = "buy-button";
  buyBtn.textContent = "Buy Now";

  buyBtn.addEventListener("click", () => {
    if (!selectedSize) {
      alert("Please select a size before buying.");
      return;
    }
    alert(`Thank you for buying ${product.name} size ${selectedSize}!`);
    closeModal();
  });

  productDetails.appendChild(buyBtn);

  productModal.classList.remove("hidden");
}

function closeModal() {
  productModal.classList.add("hidden");
}

closeModalBtn.addEventListener("click", closeModal);

// Toggle menú consola
menuIcon.addEventListener("click", () => {
  if (terminalMenu.classList.contains("hidden")) {
    terminalMenu.classList.remove("hidden");
  } else {
    terminalMenu.classList.add("hidden");
  }
});

// Click menú consola
terminalMenu.addEventListener("click", e => {
  if (e.target.classList.contains("menu-item")) {
    renderSection(e.target.dataset.section);
  }
});

// Input comando (solo consola fake)
input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const val = input.value.trim().toLowerCase();
    input.value = "";
    switch (val) {
      case "shop":
      case "collections":
      case "about":
      case "newsletter":
        renderSection(val);
        terminalMenu.classList.remove("hidden");
        break;
      default:
        alert("Command not found.");
        break;
    }
  }
});

// Al cargar
window.onload = () => {
  // Ocultar contenido principal y header hasta terminar animacion
  document.getElementById("header").style.display = "none";
  content.style.display = "none";
  terminalMenu.classList.add("hidden");

  hackerAnimation();

  // Tras animación, mostrar el contenido
  setTimeout(() => {
    document.getElementById("header").style.display = "flex";
    content.style.display = "grid";
  }, 4000);
};

