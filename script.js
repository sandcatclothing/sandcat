// Animación de hackeo (acortada)
const lines = [
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
      setTimeout(() => {
        typeLine();
      }, 600);
    } else {
      setTimeout(() => {
        document.getElementById("hack-screen").style.display = "none";
      }, 800);
    }
  }
  currentChar++;
}
window.onload = () => {
  typeLine();
};

// Toggle menú
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const targetId = item.getAttribute('data-target') + '-submenu';
    const submenu = document.getElementById(targetId);
    if (submenu) submenu.classList.toggle('hidden');
  });
});

// Comando secreto
document.getElementById("secret-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (this.value.trim().toLowerCase() === "paraloschavales") {
      document.getElementById("founders-drop").classList.remove("hidden");
    }
    this.value = "";
  }
});

// Newsletter
document.getElementById("email-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const msg = document.getElementById("newsletter-message");
    msg.textContent = `Gracias por unirte, ${this.value}`;
    this.value = "";
  }
});


