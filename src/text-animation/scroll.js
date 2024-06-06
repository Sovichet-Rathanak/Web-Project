// Animating text
function scroll_animation() {
  // Looping animation
  requestAnimationFrame(scroll_animation); // loop

  // Wrap around if x exceeds canvas width
  if (x > textCanvas.width + textCtx.measureText(userInput.value).width/2) {
    x = -(textCanvas.width + textCtx.measureText(userInput.value).width/2);
  }

  if (isNaN(speedX) || speedX === 0) {
    speedX = 0; // or any other default non-zero value
  }

  x += speedX;

  console.log(x);
  clear();
  updateCanvas(
    userInput.value,
    textColor.value,
    fontSelector.value,
    fontsize.value
  ); // draw  // New: add fontSelector.value
}
