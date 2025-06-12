// Animación inicial
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
      setTimeout(typeLine, 400);
    } else {
      setTimeout(() => {
        document.getElementById("hack-screen").style.display = "none";
      }, 400);
    }
  }
  currentChar++;
}

window.onload = () => {
  typeLine();
};

// Menú desplegable
document.querySelectorAll(".menu-item").forEach(item => {
  item.addEventListener("click", () => {
    const target = item.dataset.target;
    const submenu = document.getElementById(`${target}-submenu`);
    submenu.classList.toggle("hidden");
  });
});

// Comando secreto
const secretCommand = "paraloschavales";
const inputField = document.getElementById("secret-input");

inputField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const input = this.value.trim().toLowerCase();
    if (input === secretCommand) {
      document.getElementById("founders-drop").classList.remove("hidden");
    }
    this.value = "";
  }
});

// Newsletter
const emailInput = document.getElementById("email-input");
const message = document.getElementById("newsletter-message");

emailInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const email = this.value.trim();
    if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      message.textContent = `Gracias por unirte, ${email}`;
    } else {
      message.textContent = "Por favor ingresa un correo válido.";
    }
    this.value = "";
  }
});
