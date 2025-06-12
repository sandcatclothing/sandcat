// script.js
const lines = [
  "Accessing SANDCAT Systems...",
  "Establishing secure connection...",
  "Bypassing fashion firewalls...",
  "Injecting streetwear DNA...",
  "SANDCAT mode: ACTIVATED ✓"
];

let currentLine = 0;
let currentChar = 0;

function typeLine() {
  const target = lines[currentLine];
  if (currentChar < target.length) {
    const randomChar = String.fromCharCode(33 + Math.random() * 94);
    const pre = target.slice(0, currentChar);
    const post = target.slice(currentChar + 1);
    const scramble = pre + randomChar + post;
    document.getElementById("hack-text").textContent = scramble;
    setTimeout(typeLine, 30);
  } else {
    document.getElementById("hack-text").textContent = lines[currentLine];
    currentLine++;
    currentChar = 0;
    if (currentLine < lines.length) {
      setTimeout(typeLine, 800);
    } else {
      setTimeout(() => {
        document.getElementById("hack-screen").style.display = "none";
      }, 1200);
    }
  }
  currentChar++;
}

window.onload = () => {
  typeLine();
};

function toggleMenu() {
  const menu = document.getElementById("console-menu");
  menu.scrollIntoView({ behavior: "smooth" });
}

document.getElementById("secret-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    if (this.value.trim().toLowerCase() === "paraloschavales") {
      const secret = document.getElementById("secret-collection");
      secret.classList.remove("hidden");
      secret.classList.add("show");
    }
    this.value = "";
  }
});

document.getElementById("email-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const email = this.value.trim();
    const message = document.getElementById("newsletter-message");
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.textContent = `Gracias por unirte, ${email}`;
    } else {
      message.textContent = "Por favor ingresa un correo válido.";
    }
    this.value = "";
  }
});


