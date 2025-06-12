// script.js
const lines = [
  "Accessing SANDCAT Systems...",
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
    setTimeout(typeLine, 20);
  } else {
    document.getElementById("hack-text").textContent = lines[currentLine];
    currentLine++;
    currentChar = 0;
    if (currentLine < lines.length) {
      setTimeout(typeLine, 500);
    } else {
      setTimeout(() => {
        document.getElementById("hack-screen").style.display = "none";
      }, 600);
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

// Comando oculto
const secretCommand = "paraloschavales";
document.getElementById("secret-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const input = this.value.trim().toLowerCase();
    if (input === secretCommand) {
      const secret = document.getElementById("secret-collection");
      secret.classList.remove("hidden");
      secret.classList.add("show");
    }
    this.value = "";
  }
});

// Newsletter
const emailInput = document.getElementById("email-input");
const newsletterMessage = document.getElementById("newsletter-message");

emailInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const email = this.value.trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newsletterMessage.textContent = `Gracias por unirte, ${email}`;
    } else {
      newsletterMessage.textContent = "Por favor ingresa un correo válido.";
    }
    this.value = "";
  }
});

