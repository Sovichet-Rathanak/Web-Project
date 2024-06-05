const speedSlider = document.getElementById("slispeed");
const speedValue = document.getElementById("speedValue");
const startButton = document.getElementById("startBlinking");

let blinkInterval;
let speedX = parseFloat(userSpeed.value);
let speedY = parseFloat(userSpeed.value);

function blinkText() {
  const speed = parseInt(speedSlider.value, 10);

  clearInterval(blinkInterval);
  blinkInterval = setInterval(() => {
    textCtx.globalAlpha = textCtx.globalAlpha === 1 ? 0 : 1;
    updateCanvas(
      userInput.value,
      textColor.value,
      fontSelector.value,
      fontsize.value
    );
  }, speed);
}

document.addEventListener("DOMContentLoaded", () => {
  speedSlider.addEventListener("input", () => {
    speedValue.textContent = speedSlider.value;
  });

  startButton.addEventListener("click", blinkText);
});
