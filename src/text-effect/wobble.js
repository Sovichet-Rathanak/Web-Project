// // Initialize variables
// const text = "HEH";
// const textCanvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
let waveOffset = 0;

// // Set initial canvas size
// function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     drawText();  // Redraw text to fit new canvas size
// }
// window.addEventListener('resize', resizeCanvas);
// resizeCanvas();

// Draw the text with animation
function drawText() {
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    textCtx.textAlign = 'center';
    textCtx.textBaseline = 'middle';
    textCtx.font = `10rem Arial`;

    const centerX = textCanvas.width / 2;
    const centerY = textCanvas.height / 2;
    const characterWidth = textCtx.measureText(userInput).width / userInput.length;

    for (let i = 0; i < userInput.length; i++) {
        const angle = (i * 100) + waveOffset;
        const yOffset = Math.sin((angle + waveOffset) * Math.PI / 180) * 30; // Adjust amplitude here
        const scale = 1 + Math.sin((angle + waveOffset) * Math.PI / 180) * 0.05; // Adjust frequency here
        const colorHue = (waveOffset + i * 30) % 360;

        textCtx.save();
        textCtx.translate(centerX - (text.length * characterWidth / 2) + i * characterWidth, centerY + yOffset);
        textCtx.scale(scale, scale);
        textCtx.fillStyle = `hsl(${colorHue}, 100%, 50%)`;

        // Draw each character individually
        textCtx.fillText(text[i], 0, 0);
        textCtx.restore();
    }
}

// Animation loop
function wobbleanimate() {
    waveOffset += 2;
    drawText();
    requestAnimationFrame(wobbleanimate);
}

// Start the animation
