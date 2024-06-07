// Select elements
const userInput = document.getElementById("Input");

const textColor = document.getElementById("ColorPicker");

const boardColorPicker = document.getElementById("TCP");
const outerbox = document.querySelector(".outerbox");
const textCanvas = document.getElementById("led-text");
const textCtx = textCanvas.getContext("2d");
const backgroundCanvas = document.getElementById("backgroundCanvas");
const backgroundCtx = backgroundCanvas.getContext("2d");
const FSbutton = document.querySelector(".FSbutton");
const fontSelector = document.getElementById("FontSelector");
const userSpeed = document.getElementById("speed");

const fontsize = document.getElementById("size");

// Event listener for speed input
userSpeed.addEventListener("input", function () {
  speedY = speedX = parseFloat(userSpeed.value);
  console.log(speedY);
});

// Add event listeners for user input and text color change
userInput.addEventListener("input", () => {
  updateCanvas(
    userInput.value,
    textColor.value,
    fontSelector.value,
    fontsize.value
  ); // New : Add fontSelector.value
});

textColor.addEventListener("input", () => {
  updateCanvas(
    userInput.value,
    textColor.value,
    fontSelector.value,
    fontsize.value
  ); // New : Add fontSelector.value
});

fontSelector.addEventListener("change", () => {
  updateCanvas(
    userInput.value,
    textColor.value,
    fontSelector.value,
    fontsize.value
  ); // New: Add font selector
});

// Initialize canvas size and listen for window resize events
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Add event listener to the color picker input
boardColorPicker.addEventListener("input", () => {
  outerbox.style.backgroundColor = boardColorPicker.value;
});

// Add event listener to the Full Screen button
FSbutton.addEventListener("click", function(){
  toggleFullScreen();
});

fontsize.addEventListener("input", function () {
  updateCanvas(
    userInput.value,
    textColor.value,
    fontSelector.value,
    fontsize.value
  ); // New: Add font size
});

// Set up canvas sizes
function resizeCanvas() {
  const ratio = window.devicePixelRatio;
  textCanvas.width = outerbox.clientWidth * ratio;
  textCanvas.height = outerbox.clientHeight * ratio;
  textCtx.scale(ratio, ratio);
  backgroundCanvas.width = outerbox.clientWidth * ratio;
  backgroundCanvas.height = outerbox.clientHeight * ratio;
  backgroundCtx.scale(ratio, ratio);

  // New (need)
  x = textCanvas.width / 2 / window.devicePixelRatio;
  y = textCanvas.height / 2 / window.devicePixelRatio;

  updateCanvas(
    userInput.value,
    textColor.value,
    fontSelector.value,
    fontsize.value
  ); // New : add fontSelector.value
}

// Fullscreen toggle function
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    outerbox.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Clearing canvas
function clear() {
  textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
}

var x = textCanvas.width / 2 / window.devicePixelRatio;
var y = textCanvas.height / 2 / window.devicePixelRatio;

// Draw and update the canvas
// New : add font in condition
function updateCanvas(text, color, font, size) {
  clear();
  // Set font properties
  textCtx.font = `${size}px '${font}'`; //  !!changeable base on user input     // New : change ("120px 'Times New Roman'") to  `120px '${font}'`
  textCtx.textAlign = "center";
  textCtx.textBaseline = "middle";
  textCtx.fillStyle = color;

  // Draw text in the middle of the canvas
  textCtx.fillText(text, x, y);
}

function animationreset() {
  speedX = speedY = 0;
  x = textCanvas.width / 2 / window.devicePixelRatio;
  y = textCanvas.height / 2 / window.devicePixelRatio;

  document.getElementById("speed").value = 0;

  clear();
  updateCanvas(
    userInput.value,
    textColor.value,
    fontSelector.value,
    fontsize.value
  );
}

let waveOffset = 0;
function drawText() {
  textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  // textCtx.textAlign = 'center';
  // textCtx.textBaseline = 'middle';
  // textCtx.font = `10rem Arial`;

  // const centerX = textCanvas.width / 2;
  // const centerY = textCanvas.height / 2;
  const characterWidth = textCtx.measureText(userInput).width / userInput.length;

  for (let i = 0; i < userInput.length; i++) {
      const angle = (i * 100) + waveOffset;
      const yOffset = Math.sin((angle + waveOffset) * Math.PI / 180) * 30; // Adjust amplitude here
      const scale = 1 + Math.sin((angle + waveOffset) * Math.PI / 180) * 0.05; // Adjust frequency here
      const colorHue = (waveOffset + i * 30) % 360;

      textCtx.save();
      textCtx.translate(x - (userInput.length * characterWidth / 2) + i * characterWidth, y + yOffset);
      textCtx.scale(scale, scale);
      textCtx.fillStyle = `hsl(${colorHue}, 100%, 50%)`;
      // Draw each character individually
      textCtx.fillText(userInput[i], 0, 0);
      textCtx.restore();
  }
}

// Animation loop
function wobbleanimate() {
  waveOffset += 2;
  console.log("pressed"); 
  drawText();
  requestAnimationFrame(wobbleanimate);
}

//text effct
function texteffect(){
  var effecValue = document.getElementById("effeectselect").value;

  switch(effecValue){
    case "hour":
      wobbleanimate();
      break;
    default:
      break;
  }
}

//animation selector
function ani_select() {
  var animValue = document.getElementById("AnimSelector").value;

  switch (animValue) {
    case "float":
      float_anim();
      break;
    case "scroll":
      scroll_animation();
      break;
    case "reset":
      animationreset();
      break;
    default:
      break;
  }
}

//background selector
function bg_select() {
  var bgValue = document.getElementById("BGSelector").value;

  switch (bgValue) {
    case "rect":
      rect_animation();
      break;
    case "flow":
      flow_field();
      break;
    default:
      break;
  }
}



