function float_anim() {
  requestAnimationFrame(float_anim);

  // Function to get a random color
  function randomcolor() {
    let letters = "0123456789ABCDEF"; // Hex code
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.trunc(Math.random() * 16)];
    }
    return color;
  }

  // Get the width of the text
  let textMetrics = textCtx.measureText(userInput.value);

  let textWidth = textMetrics.width;
  let textHeight =
    textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

  if (
    x + textWidth / 2 >= textCanvas.width / window.devicePixelRatio ||
    x - textWidth / 2 <= 0
  ) {
    speedX = -speedX;
    textColor.value = randomcolor();
  }

  if (
    y + textHeight / 2 >= textCanvas.height / window.devicePixelRatio ||
    y - textHeight / 2 <= 0
  ) {
    speedY = -speedY;
    textColor.value = randomcolor();
  }

  if (isNaN(speedX) || speedX === 0) {
    speedX = 0;
  }
  if (isNaN(speedY) || speedY === 0) {
    speedY = 0;
  }
  if (isNaN(x) || isNaN(y)) {
    x = textCanvas.width / 2 / window.devicePixelRatio;
    y = textCanvas.height / 2 / window.devicePixelRatio;
  }

  y += speedY;
  x += speedX;

  updateCanvas(userInput.value, textColor.value, fontSelector.value, fontsize.value);   
}
  
