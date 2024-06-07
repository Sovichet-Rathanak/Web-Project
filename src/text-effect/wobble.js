let waveOffset = 0;

function drawText() {
  textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  let text = userInput.value; // dynamically fetch the input value
  const characterWidth = textCtx.measureText(text).width / text.length;

  for (let i = 0; i < text.length; i++) {
    const angle = i * 100 + waveOffset;
    const yOffset = Math.sin(((angle + waveOffset) * Math.PI) / 180) * 30; // Adjust amplitude here
    const scale = 1 + Math.sin(((angle + waveOffset) * Math.PI) / 180) * 0.05; // Adjust frequency here
    const colorHue = (waveOffset + i * 30) % 360;

    textCtx.save();
    textCtx.translate(
      x - (text.length * characterWidth) / 2 + i * characterWidth,
      y + yOffset
    );
    textCtx.scale(scale, scale);
    textCtx.fillStyle = `hsl(${colorHue}, 100%, 50%)`;

    textCtx.fillText(text[i], 0, 0);
    textCtx.restore();
  }
}

// Animation loop
function wobbleanimate() {
  waveOffset += 3;
  drawText();
  requestAnimationFrame(wobbleanimate);
}