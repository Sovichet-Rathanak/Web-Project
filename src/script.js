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
    console.log("HELLO from mars")
      console.log(canvas.height)
      console.log(ctx.measureText(userInput.value).height/2)
  }

<<<<<<< HEAD
  var speedX = 15; // !!changeable base on user 1input
  var speedY = 15;

  
=======
  let speed_x = 15; // !!changeable base on user 1input
>>>>>>> 78213a7fc22b4738f1cbd569d6f3d2689f841e65

  //Animating text
  function scroll_animation() {
    // Looping animationn
    requestAnimationFrame(scroll_animation); //loop

    // Wrap around if x exceeds canvas width
<<<<<<< HEAD
    if (x -(ctx.measureText(userInput.value).width)/2> canvas.width) {
      x = -(canvas.width + (ctx.measureText(userInput.value).width))/2;
    }
    x += speedX;
    
=======
    if (x > canvas.width + ctx.measureText(userInput.value).width) {
      x = - (canvas.width + ctx.measureText(userInput.value).width)/3;
      console.log(canvas.width + ctx.measureText(userInput.value).width);
      console.log(x);
    }   //changes

    x += speed_x;
>>>>>>> 78213a7fc22b4738f1cbd569d6f3d2689f841e65
    clear();
    updateCanvas(userInput.value, textColor.value); //draw
  }

  function bounce_sideway(){
<<<<<<< HEAD
    requestAnimationFrame(bounce_sideway);

    if(x + ctx.measureText(userInput.value).width/2 >= canvas.width || x  <= ctx.measureText(userInput.value).width/2 ){
      speedX = -speedX;
  
    }
    if (y -(ctx.measureText("M").width/2) > canvas.height || y  <= ctx.measureText("M").width/2 ) {
      speedY = -speedY;
      console.log("HELLO")
      console.log(canvas.height)
      console.log(y)
      console.log(y -(ctx.measureText(userInput.value).height)/2)

    }

    y += speedY;
    x += speedX;

    // console.log("bs: " + x)
    clear();
    updateCanvas(userInput.value, textColor.value);

=======
    updateCanvas(userInput.value, textColor.value);
    
    if(x + ctx.measureText(userInput.value).width*2 >= canvas.width || x  <= ctx.measureText(userInput.value).width/2 ){
      speed_x = -speed_x;
    }

    x += speed_x;
    requestAnimationFrame(bounce_sideway);
>>>>>>> 78213a7fc22b4738f1cbd569d6f3d2689f841e65
  }

  // bounce_sideway();
  scroll_animation();
});
