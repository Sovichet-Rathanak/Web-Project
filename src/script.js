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

const speedSlider = document.getElementById("slispeed");
const speedValue = document.getElementById("speedValue");
const startButton = document.getElementById("startBlinking");
let blinkInterval;

let speedX = parseFloat(userSpeed.value);
let speedY = parseFloat(userSpeed.value);

// Event listener for speed input
userSpeed.addEventListener("input", function () {
  speedX = parseFloat(userSpeed.value);
  speedY = parseFloat(userSpeed.value);
});

// let speedX = parseFloat(userSpeed.value);
// let speedY = parseFloat(userSpeed.value);

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

  updateCanvas(userInput.value, textColor.value, fontSelector.value); // New : add fontSelector.value
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
  updateCanvas(userInput.value, textColor.value, fontSelector.value); // New : Add fontSelector.value
});

textColor.addEventListener("input", () => {
  updateCanvas(userInput.value, textColor.value, fontSelector.value); // New : Add fontSelector.value
});

fontSelector.addEventListener("change", () => {
  updateCanvas(userInput.value, textColor.value, fontSelector.value); // New: add font selector
});

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
function updateCanvas(text, color, font) {
  clear();
  // Set font properties
  textCtx.font = `120px '${font}'`; //  !!changeable base on user input     // New : change ("120px 'Times New Roman'") to  `120px '${font}'`
  textCtx.textAlign = "center";
  textCtx.textBaseline = "middle";
  textCtx.fillStyle = color;

  // Draw text in the middle of the canvas
  textCtx.fillText(text, x, y);
}

// Animating text
function scroll_animation() {
  // Looping animation
  requestAnimationFrame(scroll_animation); // loop

  // Wrap around if x exceeds canvas width
  if (x > textCanvas.width + textCtx.measureText(userInput.value).width / 2) {
    x = -(textCanvas.width + textCtx.measureText(userInput.value).width) / 2;
  }
  x += speedX;

  clear();


  updateCanvas(userInput.value, textColor.value, fontSelector.value); // draw  // New: add fontSelector.value

  
}

function float_anim() {
  requestAnimationFrame(float_anim);

  //function to get random color
  function randomcolor() {
    let letters = "0123456789ABCDEF"; //Hexcode
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.trunc(Math.random() * 16)];
    }
    return color;
  }
  
  if (x + textCtx.measureText(userInput.value).width / 2 >= textCanvas.width ||x <= textCtx.measureText(userInput.value).width / 2) {
    speedX = -speedX;
    textColor.value = randomcolor(); //Update value if it touch the canva
  }
  if (y - textCtx.measureText("M").width / 2 >= textCanvas.height ||y <= textCtx.measureText("M").width / 2
  ) {
    speedY = -speedY;
    textColor.value = randomcolor();
  }

  y += speedY;
  x += speedX;

  // console.log("bs: " + x)
  clear();
  updateCanvas(userInput.value, textColor.value, fontSelector.value); // New : add fontSelector.value
}

var requestID;
function reset() {
  x = textCanvas.width / 2 / window.devicePixelRatio;
  y = textCanvas.height / 2 / window.devicePixelRatio;

  requestID = undefined;
  outerbox.requestAnimationFrame(requestID);
  clear();
}

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

//Flow Field//

//Create Particle
class Particle {
  constructor(effect) {
    this.timer--;
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.speedX;
    this.speedY;
    this.speedModifier = Math.floor(Math.random() * 5 + 1);
    this.history = [{ x: this.x, y: this.y }];
    this.maxlength = Math.random() * 200 + 10;
    this.angle = 0;
    this.timer = this.maxlength * 2;
    this.colors = ["#cfecf7", "#a0d9ef", "#62c1e5", "#20a7db", "#1c96c5"];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  draw(backgroundCtx) {
    // Specify which canvas we want to draw on
    backgroundCtx.beginPath();

    // Draw the particle
    backgroundCtx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
    backgroundCtx.fillStyle = "white";
    backgroundCtx.fill();
    backgroundCtx.strokeStyle = this.color;
    backgroundCtx.lineWidth = 1;
    backgroundCtx.stroke();

    // Draw the history path
    backgroundCtx.beginPath();
    backgroundCtx.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 1; i < this.history.length; i++) {
      backgroundCtx.lineTo(this.history[i].x, this.history[i].y);
    }
    backgroundCtx.stroke();
  }

  update() {
    this.timer--;

    if (this.timer >= 0.5) {
      let x = Math.floor(this.x / this.effect.cellsize);
      let y = Math.floor(this.y / this.effect.cellsize);
      let index = y * this.effect.cols + x;
      this.angle = this.effect.flowField[index];

      this.speedX = Math.cos(this.angle);
      this.speedY = Math.sin(this.angle);
      this.x += this.speedX * this.speedModifier;
      this.y += this.speedY * this.speedModifier;

      this.history.push({ x: this.x, y: this.y });

      if (this.history.length > this.maxlength) {
        this.history.shift();
      }
    } else if (this.history.length > 1) {
      this.history.shift();
    } else {
      this.reset();
    }
  }

  reset() {
    this.x = Math.trunc(Math.random() * this.effect.width);
    this.y = Math.trunc(Math.random() * this.effect.height);
    this.history = [{ x: this.x, y: this.y }];
    this.timer = this.maxlength * 2;
  }
}

//Manage Effect
class Effect {
  constructor(width, height) {
    //need to be aware of the canvas height to create particle
    this.width = width;
    this.height = height;
    this.particles = [];
    this.numberOfParticles = 1400;
    this.cellsize = 20;
    this.rows;
    this.cols;
    this.flowField = [];
    this.curve = 3.4;
    this.zoom = 0.055;
    this.intial();
  }

  //Initialize our particles
  intial() {
    //use perlin noise to create flow field
    this.rows = Math.floor(this.height / this.cellsize);
    this.cols = Math.floor(this.width / this.cellsize);
    this.flowField = [];

    for (let y = 0; y <= this.rows; y++) {
      for (let x = 0; x <= this.cols; x++) {
        let angle =
          (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
        this.flowField.push(angle);
      }
    }
    // console.log(this.flowField);

    //create particles on canvas
    for (let i = 0; i <= this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  //Render our particles onto our canvas
  render(backgroundCtx) {
    this.particles.forEach((particles) => {
      particles.draw(backgroundCtx);
      particles.update();
    });
  }
}

const effect = new Effect(backgroundCanvas.width, backgroundCanvas.height);
console.log(effect);

function flow_field() {
  backgroundCtx.clearRect(
    0,
    0,
    backgroundCanvas.width,
    backgroundCanvas.height
  );
  effect.render(backgroundCtx);
  requestAnimationFrame(flow_field);
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
      reset();
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

function blinkText() {
  const text = userInput.value;
  const speed = parseInt(speedSlider.value, 10);

  if (!text) {
    alert('Please enter some text to blink');
    return;
  }

  clearInterval(blinkInterval);
  blinkInterval = setInterval(() => {
    textCtx.globalAlpha = textCtx.globalAlpha === 1 ? 0 : 1;
    updateCanvas(userInput.value, textColor.value, fontSelector.value);
  }, speed);
}

document.addEventListener("DOMContentLoaded", () => {
  speedSlider.addEventListener('input', () => {
    speedValue.textContent = speedSlider.value;
  });

  startButton.addEventListener('click', blinkText);
});



