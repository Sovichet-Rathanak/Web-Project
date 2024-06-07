//Flow Field//

//Create Particle
class Particle {
  constructor(effect) {
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
   
    // Draw the particle
    // backgroundCtx.beginPath();
    // backgroundCtx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
    // backgroundCtx.fillStyle = "white";
    // backgroundCtx.fill();
    backgroundCtx.beginPath();
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
  constructor(backgroundCanvas) {
    //need to be aware of the canvas height to create particle
    this.backgroundCanvas = backgroundCanvas;
    this.width = this.backgroundCanvas.width;
    this.height = this.backgroundCanvas.height;
    this.particles = [];
    this.numberOfParticles = 2000;
    this.cellsize = 20;
    this.rows;
    this.cols;
    this.flowField = [];
    this.curve = 3.6;
    this.zoom = 0.055;
    this.intial();

    window.addEventListener("resize", (e) => {
      this.resize(e.target.innerWidth, e.target.innerHeight);
    });
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

    //create particles on canvas
    this.particles = [];
    for (let i = 0; i <= this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  resize(width, height) {
    this.backgroundCanvas.width = width;
    this.backgroundCanvas.height = height;
    this.height = this.backgroundCanvas.height;
    this.width = this.backgroundCanvas.width;
    this.intial();
  }

  //Render our particles onto our canvas
  render(backgroundCtx) {
    this.particles.forEach((particles) => {
      particles.draw(backgroundCtx);
      particles.update();
    });
  }
}

const effect = new Effect(backgroundCanvas);

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