
const output = document.getElementById("output");
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

function print(text) {
  const line = document.createElement("div");
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function showProducts(collection) {
  const list = products[collection];
  if (!list) {
    print("Collection not found.");
    return;
  }
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = `product ${collection}`;
    div.innerHTML = `<img src="${p.image}" alt="${p.name}"><strong>${p.name}</strong><br>${p.price}`;
    output.appendChild(div);
  });
}

function processCommand(cmd) {
  cmd = cmd.trim().toLowerCase();
  print("> " + cmd);

  if (cmd === "shop") {
    ["core", "limited", "bloodline", "relic"].forEach(showProducts);
  } else if (cmd === "collections") {
    print("Available collections:");
    print("- core");
    print("- limited");
    print("- bloodline");
    print("- relic");
  } else if (["core", "limited", "bloodline", "relic"].includes(cmd)) {
    showProducts(cmd);
  } else if (cmd === "about") {
    print("SANDCAT is a terminal-native clothing brand. Welcome to the drop.");
  } else if (cmd === "contact") {
    print("Contact us at: contact@sandcat.es");
  } else {
    print("Unknown command. Try: shop, collections, about, contact");
  }
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    processCommand(input.value);
    input.value = "";
  }
});
