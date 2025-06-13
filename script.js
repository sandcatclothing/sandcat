const hackTextElement = document.getElementById("hack-text");
const hackScreen = document.getElementById("hack-screen");

const hackLines = [
  "Accessing SANDCAT Systems...",
  "Establishing secure connection...",
  "Bypassing fashion firewalls...",
  "Injecting streetwear DNA...",
  "SANDCAT mode: ACTIVATED ✓"
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
        revealInterval = setInterval(showNextChar, 50);
      }, 400);
    } else {
      setTimeout(() => {
        hackScreen.style.display = "none";
      }, 800);
    }
  }
}

window.onload = () => {
  revealInterval = setInterval(showNextChar, 50);
};

function handleCommand(e) {
  if (e.key === "Enter") {
    const input = e.target.value.trim().toLowerCase();
    if (input === "paraloschavales") {
      document.querySelector(".secret-tag").classList.remove("hidden");
    }
    e.target.value = "";
  }
}

