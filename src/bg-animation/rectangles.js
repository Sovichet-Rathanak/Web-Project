// Create rectangles for background animation
var rectangles = [];
for (var i = 0; i < 50; i++) {
  const boxWidth = 1;
  const boxHeight = 6;
  const randomNum = Math.random() * 50;

  rectangles.push({
    x: Math.random() * window.innerWidth,
    y: -(boxHeight * randomNum),
    width: boxWidth * randomNum,
    height: boxHeight * randomNum,
    color:
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0"),
    speed: 1 + Math.random() * 3,
  });
}

function rect_animation() {
  backgroundCtx.clearRect(
    0,
    0,
    backgroundCanvas.width,
    backgroundCanvas.height
  ); // Clear the background canvas

  // Update and draw each rectangle
  rectangles.forEach(function (rect) {
    rect.y += rect.speed; // Update position
    if (rect.y > backgroundCanvas.height) rect.y = -rect.height; // Reset position if it goes beyond the canvas

    // Draw the rectangle
    backgroundCtx.fillStyle = rect.color;
    backgroundCtx.fillRect(rect.x, rect.y, rect.width, rect.height);
  });

  requestAnimationFrame(rect_animation); // Loop
}
