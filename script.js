// script.js
const matrix = document.getElementById("matrix");
const mainContent = document.getElementById("main-content");

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
let matrixText = "";
for (let i = 0; i < 400; i++) {
  matrixText += chars[Math.floor(Math.random() * chars.length)];
  if (i % 80 === 0) matrixText += "\n";
}
matrix.innerText = matrixText;

setTimeout(() => {
  document.getElementById("hacker-animation").style.display = "none";
  mainContent.style.display = "block";
}, 3000);

const buttons = document.querySelectorAll(".terminal-menu button");
const sections = document.querySelectorAll(".content-section");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    sections.forEach(s => s.style.display = "none");
    const selected = document.getElementById(btn.dataset.section);
    if (selected) selected.style.display = "block";
  });
});

const modal = document.getElementById("product-modal");
const closeModal = document.querySelector(".close");
const productTitle = document.getElementById("product-title");
const viewButtons = document.querySelectorAll(".view-product");

viewButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const title = btn.parentElement.querySelector("h3").innerText;
    productTitle.innerText = title;
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
