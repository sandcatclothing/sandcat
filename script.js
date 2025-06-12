// Animación de hackeo
const lines = [
  "Accessing SANDCAT Systems...",
  "Establishing secure connection...",
  "Bypassing fashion firewalls...",
  "Injecting streetwear DNA...",
  "SANDCAT mode: ACTIVATED ✓"
];

let currentLine = 0;
let currentChar = 0;
let displayText = "";
let interval;

function typeLine() {
  const target = lines[currentLine];
  if (currentChar < target.length) {
    // Simula caracteres aleatorios antes de fijar el correcto
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
      setTimeout(() => {
        typeLine();
      }, 800);
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

// Menú hamburguesa
function toggleMenu() {
  const menu = document.getElementById("console-menu");
  menu.scrollIntoView({ behavior: "smooth" });
}

// Comando secreto
document.getElementById("secret-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    if (this.value.trim().toLowerCase() === "paraloschavales") {
      document.getElementById("secret-collection").classList.remove("hidden");
    }
    this.value = "";
  }
});

// Newsletter enter
document.getElementById("email-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    alert(`Gracias por unirte, ${this.value}`);
    this.value = "";
  }
});


