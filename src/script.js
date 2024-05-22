document.addEventListener("DOMContentLoaded", (event) => {
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

  // Draw and update the canva
  function updateCanvas(text, color) {
    clear();
    // Set font properties
    ctx.font = "120px 'Times New Roman'"; //  !!changeable base on user input
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    // Draw text in the middle of the canvas
    ctx.fillText(text, x, canvas.height / 2 / window.devicePixelRatio); 
  }

  var speed = 3; // !!changeable base on user input
  var input_width = ctx.measureText(userInput.value).width;

  //Animating text
  function scroll_animation() {
    // Looping animationn
    requestAnimationFrame(scroll_animation); //loop

    // Wrap around if x exceeds canvas width
    if (x > canvas.width) {
      x = -input_width;
    }

    x += speed;
    clear();
    updateCanvas(userInput.value, textColor.value); //draw
  }

  function bounce_sideway(){
    requestAnimationFrame(bounce_sideway);

    if(x + input_width > canvas.width || x < 0){
      speed = -speed;
    }

    x += speed;

    updateCanvas(userInput.value, textColor.value);
  }

  // bounce_sideway();
  scroll_animation();
});
