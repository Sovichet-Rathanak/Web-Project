// Select the color picker element and the outerbox element
const boardColorPicker = document.getElementById("TCP");
const outerbox = document.querySelector(".outerbox");
// Canvas
const canvas = document.getElementById("led-text");
const ctx = canvas.getContext("2d");
const ratio = window.devicePixelRatio;
canvas.width = Math.floor(800 * ratio);
canvas.height = Math.floor(800 * ratio);
ctx.scale(ratio, ratio);

// Add an event listener to the color picker input
boardColorPicker.addEventListener("input", () => {
  // Change the background color of the outerbox based on the selected color
  outerbox.style.backgroundColor = boardColorPicker.value;
});

document.addEventListener("DOMContentLoaded", (event) => {
  const userInput = document.getElementById("Input");
  const textColor = document.getElementById("ColorPicker");
  console.log(textColor);
  // Event listener for input field
  userInput.addEventListener("input", () => {
    updateCanvas(userInput.value, textColor.value);
  });
  textColor.addEventListener("input", () => {
    updateCanvas(userInput.value, textColor.value);
  });
});

function updateCanvas(text, color) {
  // Clear the canvas before drawing new text
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Set font properties (optional, you can customize this)
  ctx.font = "100px Arial";
  ctx.fillStyle = color; // Default text color (can be customized)
  ctx.fillText(text, canvas.width / 2, canvas.height / 2); // Drawing text on canvas
}
