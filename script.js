const loadingText = document.getElementById("loading-text");
const loadingScreen = document.getElementById("loading-screen");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
let index = 0;
const fakeData = [];

for (let i = 0; i < 200; i++) {
  let line = "";
  for (let j = 0; j < 60; j++) {
    line += characters[Math.floor(Math.random() * characters.length)];
  }
  fakeData.push(line);
}

function showNextLine() {
  if (index < fakeData.length) {
    loadingText.textContent += fakeData[index] + "\n";
    index++;
    setTimeout(showNextLine, 15);
  } else {
    loadingScreen.style.display = "none";
  }
}

window.onload = showNextLine;

// Modal logic (simplified)
const modal = document.getElementById("product-modal");
const closeModal = document.getElementById("close-modal");
closeModal.onclick = () => modal.classList.add("hidden");

// Sample way to open modal:
// document.querySelector(".product").onclick = () => modal.classList.remove("hidden");
