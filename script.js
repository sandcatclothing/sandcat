const hackAnimation = document.getElementById("hack-animation");
const content = document.getElementById("content");
const hamburger = document.getElementById("hamburger");
const terminalMenu = document.getElementById("terminal-menu");

let hackData = "";
const chars = "0123456789ABCDEF@#$%^&*()+=-{}[]<>?";

// Animación hacker — escribe caracteres random durante 3.5 segundos aprox y luego desaparece
function runHackAnimation() {
  let count = 0;
  const maxCount = 300; // cantidad de caracteres generados
  const interval = setInterval(() => {
    hackData += chars.charAt(Math.floor(Math.random() * chars.length));
    hackData += chars.charAt(Math.floor(Math.random() * chars.length));
    hackData += chars.charAt(Math.floor(Math.random() * chars.length));
    hackData += chars.charAt(Math.floor(Math.random() * chars.length));
    hackData += chars.charAt(Math.floor(Math.random() * chars.length));
    hackData += chars.charAt(Math.floor(Math.random() * chars.length));
    hackData += chars.charAt(Math.floor(Math.random() * chars.length));
    hackData += chars.charAt(Math.floor(Math.random() * chars.length));
    hackData += "\n";
    hackAnimation.textContent = hackData;
    count++;
    if (count > maxCount) {
      clearInterval(interval);
      hackAnimation.style.transition = "opacity 1.5s ease";
      hackAnimation.style.opacity = 0;
      setTimeout(() => {
        hackAnimation.style.display = "none";
        // Mostrar contenido principal y menú
        terminalMenu.classList.remove("hidden");
        content.innerHTML = ""; // carga inicial vacía
      }, 1500);
    }
  }, 20);
}

// Toggle menú terminal
hamburger.addEventListener("click", () => {
  terminalMenu.classList.toggle("hidden");
});

// Datos de productos y colecciones
const products = [
  {
    id: 1,
    name: "Core Tee",
    category: "tee",
    collection: "core drop",
    image: "assets/core_tee.png",
    price: 25,
    rarity: "core",
    description: "Camiseta básica Core Drop, calidad premium.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Core Hoodie",
    category: "hoodies",
    collection: "core drop",
    image: "assets/core_hoodie.png",
    price: 55,
    rarity: "core",
    description: "Sudadera Core Drop con capucha, cómoda y estilosa.",
    sizes: ["M", "L", "XL"],
  },
  {
    id: 3,
    name: "SANDCAT Cap",
    category: "accessories",
    collection: "core drop",
    image: "assets/cap.png",
    price: 15,
    rarity: "core",
    description: "Gorra SANDCAT oficial para el día a día.",
    sizes: ["One Size"],
  },
];

// Mostrar sección según clic del menú
terminalMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-item")) {
    const section = e.target.getAttribute("data-section");
    if (!section) return;

    if (section === "shop") {
      // Mostrar menú desplegable de categorías shop
      const shopSubmenu = document.getElementById("shop-categories");
      const isHidden = shopSubmenu.classList.contains("hidden");
      if (isHidden) {
        shopSubmenu.classList.remove("hidden");
      } else {
        shopSubmenu.classList.add("hidden");
      }
      // Si show submenu, no cargar productos aún
      content.innerHTML = "";
    } else {
      // Ocultar submenu de shop si no es shop
      document.getElementById("shop-categories").classList.add("hidden");
      showSection(section);
    }
  } else if (e.target.parentElement?.id === "shop-categories") {
    // Click en categoría de shop
    const cat = e.target.textContent.replace("> ", "").toLowerCase();
    showShopCategory(cat);
  }
});

// Mostrar secciones no shop
function showSection(section) {
  content.innerHTML = "";
  if (section === "collections") {
    // Mostrar CORE DROP con productos tee y hoodie
    content.innerHTML = `
      <h2>CORE DROP</h2>
      <div class="product" data-id="1">
        <img src="assets/core_tee.png" alt="Core Tee" />
        <strong>Core Tee</strong>
        <span>Camiseta</span>
        <span>€25</span>
      </div>
      <div class="product" data-id="2">
        <img src="assets/core_hoodie.png" alt="Core Hoodie" />
        <strong>Core Hoodie</strong>
        <span>Sudadera</span>
        <span>€55</span>
      </div>
    `;
  } else if (section === "about") {
    content.innerHTML = `
      <h2>About SANDCAT</h2>
      <p>Bienvenido a SANDCAT, la marca urbana canalla con actitud.</p>
    `;
  } else if (section === "contact") {
    content.innerHTML = `
      <h2>Contact</h2>
      <p>Escríbenos a contacto@sandcat.com</p>
    `;
  }
}

// Mostrar productos por categoría shop
function showShopCategory(category) {
  content.innerHTML = "";
  let filtered = [];
  if (category === "view all") filtered = products;
  else filtered = products.filter(p => p.category === category);

  if (filtered.length === 0) {
    content.innerHTML = "<p>No products found in this category.</p>";
    return;
  }

  filtered.forEach((p) => {
    content.innerHTML += `
      <div class="product" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" />
        <strong>${p.name}</strong>
        <span>${capitalize(p.category)}</span>
        <span>€${p.price}</span>
      </div>
    `;
  });
}

// Capitalizar texto
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Mostrar detalles producto (modal)
content.addEventListener("click", (e) => {
  const productEl = e.target.closest(".product");
  if (!productEl) return;
  const id = productEl.getAttribute("data-id");
  const product = products.find(p => p.id == id);
  if (!product) return;

  showProductDetail(product);
});

function showProductDetail(product) {
  let modal = document.getElementById("product-detail");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "product-detail";
    document.body.appendChild(modal);
  }
  modal.style.display = "flex";
  modal.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <strong>${product.name}</strong>
    <p class="rarity">Category: ${capitalize(product.category)}</p>
    <p>${product.description}</p>
    <label for="size-select">Select size:</label>
    <select id="size-select">
      ${product.sizes.map(s => `<option value="${s}">${s}</option>`).join("")}
    </select>
    <button id="add-to-cart">Add to cart - €${product.price}</button>
    <button id="close-detail" style="margin-top:10px; background:#330000; color:#ff6666;">Close</button>
  `;

  // Añadir event listeners a botones dentro del modal
  modal.querySelector("#close-detail").onclick = () => {
    modal.style.display = "none";
  };

  modal.querySelector("#add-to-cart").onclick = () => {
    alert(`Added ${product.name} (${document.getElementById("size-select").value}) to cart.`);
  };
}

// Inicialización
window.onload = () => {
  runHackAnimation();
  terminalMenu.classList.add("hidden"); // menú oculto al inicio
};

