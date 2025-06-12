const content = document.getElementById("content");
const input = document.getElementById("command");

const products = {
  core: [
    { name: "SANDCAT CORE TEE", image: "assets/core_tee.png", price: "29.99 €", rarity: "core" },
    { name: "ESSENTIAL HOODIE", image: "assets/core_hoodie.png", price: "49.99 €", rarity: "core" }
  ],
  limited: [
    { name: "PHANTOM PURPLE DROP", image: "assets/limited_purple.png", price: "59.99 €", rarity: "limited" }
  ],
  bloodline: [
    { name: "REDLINE CREWNECK", image: "assets/bloodline_crew.png", price: "54.99 €", rarity: "bloodline" }
  ],
  relic: [
    { name: "GOLD EMBLEM ZIP HOODIE", image: "assets/relic_gold.png", price: "89.99 €", rarity: "relic" }
  ]
};

function showSection(section) {
  content.innerHTML = "";
  if (section === "shop") {
    Object.values(products).flat().forEach(p => {
      const div = document.createElement("div");
      div.className = `product ${p.rarity}`;
      div.innerHTML = `<img src="${p.image}" alt="${p.name}">
        <strong>${p.name}</strong><br>
        <span>${p.rarity.toUpperCase()}</span><br>
        ${p.price}`;
      content.appendChild(div);
    });
  } else if (section === "collections") {
    content.innerHTML = "<div class='collection-buttons'>" +
      Object.keys(products).map(key =>
        `<button class="collection-button" onclick="showProducts('${key}')">${key.toUpperCase()}</button>`
      ).join('') +
      "</div>";
  } else if (section === "about") {
    content.innerHTML = "<p>SANDCAT is a terminal-native clothing brand. Welcome to the drop.</p>";
  } else if (section === "contact") {
    content.innerHTML = "<p>Contact us at: contact@sandcat.es</p>";
  }
}

function showProducts(collection) {
  const list = products[collection];
  if (!list) return;
  content.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = `product ${collection}`;
    div.innerHTML = `<img src="${p.image}" alt="${p.name}">
      <strong>${p.name}</strong><br>
      <span>${p.rarity.toUpperCase()}</span><br>
      ${p.price}`;
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
