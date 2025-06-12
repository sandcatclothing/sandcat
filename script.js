
const content = document.getElementById("content");
const input = document.getElementById("command");

const products = {
  core: [
    { name: "SANDCAT CORE TEE", image: "assets/core_tee.png", price: "29.99 €" },
    { name: "ESSENTIAL HOODIE", image: "assets/core_hoodie.png", price: "49.99 €" }
  ],
  limited: [
    { name: "PHANTOM PURPLE DROP", image: "assets/limited_purple.png", price: "59.99 €" }
  ],
  bloodline: [
    { name: "REDLINE CREWNECK", image: "assets/bloodline_crew.png", price: "54.99 €" }
  ],
  relic: [
    { name: "GOLD EMBLEM ZIP HOODIE", image: "assets/relic_gold.png", price: "89.99 €" }
  ]
};

function showSection(section) {
  content.innerHTML = "";
  if (section === "shop") {
    ["core", "limited", "bloodline", "relic"].forEach(showProducts);
  } else if (section === "collections") {
    content.innerHTML = "<ul>" +
      Object.keys(products).map(key => `<li onclick="showProducts('${key}')">${key.toUpperCase()}</li>`).join('') +
      "</ul>";
  } else if (section === "about") {
    content.textContent = "SANDCAT is a terminal-native clothing brand. Welcome to the drop.";
  } else if (section === "contact") {
    content.textContent = "Contact us at: contact@sandcat.es";
  }
}

function showProducts(collection) {
  const list = products[collection];
  if (!list) return;
  content.innerHTML = `<h2>${collection.toUpperCase()} Collection</h2>`;
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = `product ${collection}`;
    div.innerHTML = `<img src="${p.image}" alt="${p.name}"><strong>${p.name}</strong><br>${p.price}`;
    content.appendChild(div);
  });
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim().toLowerCase();
    if (cmd === "drop42") {
      content.innerHTML = "<p><strong>🔒 Secret drop unlocked!</strong></p>";
    } else {
      content.innerHTML = "<p>Unknown command.</p>";
    }
    input.value = "";
  }
});
