const hackTextElement = document.getElementById("hack-text");
const hackScreen = document.getElementById("hack-screen");

const hackLines = [
  "SANDCAT mode: ACTIVATED ✓",
];

let currentLine = 0;
let currentChar = 0;
let revealInterval;

function showNextChar() {
  const line = hackLines[currentLine];
  const partial = line.slice(0, currentChar);
  const randomTail = Array.from({ length: line.length - currentChar }, () =>
    String.fromCharCode(33 + Math.random() * 94 | 0)
  ).join("");

  hackTextElement.innerText = partial + randomTail;

  if (currentChar < line.length) {
    currentChar++;
  } else {
    clearInterval(revealInterval);
    currentLine++;
    currentChar = 0;

    if (currentLine < hackLines.length) {
      setTimeout(() => {
        revealInterval = setInterval(showNextChar, 40);
      }, 400);
    } else {
      setTimeout(() => {
        hackScreen.style.display = "none";
      }, 800);
    }
  }
}

window.onload = () => {
  revealInterval = setInterval(showNextChar, 40);
};

function handleCommand(e) {
  if (e.key === "Enter") {
    const input = e.target.value.trim().toLowerCase();
    switch (input) {
      case "shop":
        window.location.href = "shop.html";
        break;
      case "collections":
        window.location.href = "collections.html";
        break;
      case "about":
        window.location.href = "about.html";
        break;
      case "contact":
        window.location.href = "contact.html";
        break;
      case "paraloschavales":
        document.querySelector(".secret-tag").classList.remove("hidden");
        break;
      default:
        alert("Unknown command: " + input);
    }
    e.target.value = "";
  }
}

