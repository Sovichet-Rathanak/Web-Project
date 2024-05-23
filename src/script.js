// Select elements
const userInput = document.getElementById("Input");
const textColor = document.getElementById("ColorPicker");
const boardColorPicker = document.getElementById("TCP");
const outerbox = document.querySelector(".outerbox");
const canvas = document.getElementById("led-text");
const ctx = canvas.getContext("2d");
const FSbutton = document.querySelector(".FSbutton");

// Set up canvas
function resizeCanvas() {
  const ratio = window.devicePixelRatio;
  canvas.width = outerbox.clientWidth * ratio;
  canvas.height = outerbox.clientHeight * ratio;
  ctx.scale(ratio, ratio);
  updateCanvas(userInput.value, textColor.value);
}

// Initialize canvas size and listen for window resize events
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Add event listener to the color picker input
boardColorPicker.addEventListener("input", () => {
  outerbox.style.backgroundColor = boardColorPicker.value;
});

// Add event listener to the Full Screen button
FSbutton.addEventListener("click", function () {
  toggleFullScreen();
});

// Add event listeners for user input and text color change
userInput.addEventListener("input", () => {
  updateCanvas(userInput.value, textColor.value);
});

textColor.addEventListener("input", () => {
  updateCanvas(userInput.value, textColor.value);
});

// Fullscreen toggle function
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    outerbox.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

//Clearing canva
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var x = canvas.width / 2 / window.devicePixelRatio;
var y = canvas.height / 2 / window.devicePixelRatio;

// Draw and update the canva
function updateCanvas(text, color) {
  // clear();
  // Set font properties
  ctx.font = "120px 'Times New Roman'"; //  !!changeable base on user input
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  // Draw text in the middle of the canvas
  ctx.fillText(text, x, y);
}

var speed = 10; // !!changeable base on user 1input
var speedX;
var speedY;

speedX = speedY = speed;

//Animating text
function scroll_animation() {
  // Looping animationn
  requestAnimationFrame(scroll_animation); //loop

  // Wrap around if x exceeds canvas width
  if (x > canvas.width + ctx.measureText(userInput.value).width / 2) {
    x = -(canvas.width + ctx.measureText(userInput.value).width) / 2;
  }
  x += speedX;

  clear();
  updateCanvas(userInput.value, textColor.value); //draw
}

function float() {
  requestAnimationFrame(float);

  //function to get random color
  function randomcolor() {
    let letters = "0123456789ABCDEF"; //Hexcode
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.trunc(Math.random() * 16)];
    }
    return color;
  }

  if (x + ctx.measureText(userInput.value).width / 2 >= canvas.width ||x <= ctx.measureText(userInput.value).width / 2) {
    speedX = -speedX;
    textColor.value = randomcolor(); //Update value if it touch the canva
  }

  if (y > canvas.height + ctx.measureText("M").width / 2 || y <= ctx.measureText("M").width / 2) {
    speedY = -speedY;
    textColor.value = randomcolor();
  }

  y += speedY;
  x += speedX;

  // console.log("bs: " + x)
  clear();
  console.log(randomcolor());
  updateCanvas(userInput.value, textColor.value);
}

// Function to get the animation input
function ani_select() {
  var animmValue = document.getElementById("AnimSelector").value;
  console.log(animmValue);

  switch (animmValue) {
    case "float":
      float();
      break;
    case "scroll":
      scroll_animation();
      break;
    default:
      break;
  }
}

updateCanvas(userInput.value, textColor.value);
