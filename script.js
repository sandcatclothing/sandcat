document.addEventListener("DOMContentLoaded", () => {
  const hackScreen = document.getElementById("hack-screen");

  const messages = [
    "Accessing SANDCAT Systems...",
    "Establishing secure connection...",
    "Bypassing fashion firewalls...",
    "Injecting streetwear DNA...",
    "SANDCAT mode: ACTIVATED ✓"
  ];

  let currentLine = 0;

  const randomChar = () => {
    const chars = "!@#$%^&*()_+=-[]{}|;:,.<>/?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const revealText = (text, callback) => {
    let display = new Array(text.length).fill("");
    let iterations = 0;
    const totalIterations = text.length * 6; // Ajusta velocidad aquí

    const interval = setInterval(() => {
      for (let i = 0; i < text.length; i++) {
        if (iterations / 6 > i) {
          display[i] = text[i];
        } else {
          display[i] = randomChar();
        }
      }

      hackScreen.innerText = display.join("");

      iterations++;
      if (iterations > totalIterations) {
        clearInterval(interval);
        hackScreen.innerText = text;
        setTimeout(callback, 500); // Espera antes del siguiente mensaje
      }
    }, 30);
  };

  const showNextLine = () => {
    if (currentLine < messages.length) {
      revealText(messages[currentLine], () => {
        currentLine++;
        showNextLine();
      });
    } else {
      // Oculta el hack screen tras terminar
      setTimeout(() => {
        hackScreen.classList.add("hidden");
      }, 1000);
    }
  };

  showNextLine();
});



