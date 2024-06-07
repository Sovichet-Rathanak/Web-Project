// Define initial shadow properties
var shadowOffsets = [
  { x3d: 5, y3d: -5 },
  { x3d: 4, y3d: -4 },
  { x3d: 3, y3d: -3 },
  { x3d: 2, y3d: -2 },
  { x3d: 1, y3d: -1 },
  { x3d: -1, y3d: 1 },
  { x3d: -2, y3d: 2 },
  { x3d: -3, y3d: 3 },
];

// Animation loop
function draw3D() {
  textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  let text = userInput.value;
  shadowOffsets.forEach(function (offset, index) {
    var animatedOffsetX =
      offset.x3d + Math.sin(index * 0.1 + Date.now() * 0.005) * 5;
    var animatedOffsetY =
      offset.y3d + Math.cos(index * 0.1 + Date.now() * 0.005) * 5;
    textCtx.lineWidth = 3;
    textCtx.fillStyle = textColor.value;
    textCtx.strokeText(text, x + animatedOffsetX, y + animatedOffsetY);
    textCtx.fillText(text, x + animatedOffsetX, y + animatedOffsetY);
  });
}

function animate_3d() {
  draw3D();
  requestAnimationFrame(animate_3d);
}
