const fireworks = [];
const particles = [];

function randomcolor() {
  let letters = "0123456789ABCDEF"; // Hex code
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.trunc(Math.random() * 16)];
  }
  return color;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function Firework(x, y, targetX, targetY) {
  this.x = x;
  this.y = y;
  this.targetX = targetX;
  this.targetY = targetY;
  this.speed = 2;
  this.angle = Math.atan2(targetY - y, targetX - x);
  this.distanceToTarget = Math.hypot(targetX - x, targetY - y);
  this.distanceTraveled = 0;
  this.coordinates = [];
  this.coordinateCount = 3;
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }
  this.brightness = random(50, 70);
}

Firework.prototype.update = function (index) {
  this.coordinates.pop();
  this.coordinates.unshift([this.x, this.y]);

  this.distanceTraveled = Math.hypot(
    this.x - this.targetX,
    this.y - this.targetY
  );
  if (this.distanceTraveled >= this.distanceToTarget) {
    createParticles(this.targetX, this.targetY);
    fireworks.splice(index, 1);
  } else {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }
};

Firework.prototype.draw = function () {
  backgroundCtx.beginPath();
  backgroundCtx.moveTo(
    this.coordinates[this.coordinates.length - 1][0],
    this.coordinates[this.coordinates.length - 1][1]
  );
  backgroundCtx.lineTo(this.x, this.y);
  backgroundCtx.strokeStyle = randomcolor();
  backgroundCtx.stroke();
};

function firework_particle(x, y) {
  this.x = x;
  this.y = y;
  this.angle = random(0, Math.PI * 2);
  this.speed = random(1, 10);
  this.friction = 0.95;
  this.gravity = 1;
  this.brightness = random(50, 80);
  this.alpha = 1;
  this.decay = random(0.015, 0.03);
}

firework_particle.prototype.update = function (index) {
  this.speed *= this.friction;
  this.x += Math.cos(this.angle) * this.speed;
  this.y += Math.sin(this.angle) * this.speed + this.gravity;
  this.alpha -= this.decay;

  if (this.alpha <= this.decay) {
    particles.splice(index, 1);
  }
};

firework_particle.prototype.draw = function () {
  backgroundCtx.beginPath();
  backgroundCtx.arc(this.x, this.y, 3, 0, Math.PI * 5);
  backgroundCtx.fillStyle = randomcolor();
  backgroundCtx.fill();
};

function createParticles(x, y) {
  let particleCount = 700;
  while (particleCount--) {
    particles.push(new firework_particle(x, y));
  }
}

function loop() {
  requestAnimationFrame(loop);

  backgroundCtx.globalCompositeOperation = "destination-out";
  backgroundCtx.fillStyle = randomcolor();
  backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
  backgroundCtx.globalCompositeOperation = "lighter";

  let i = fireworks.length;
  while (i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  let j = particles.length;
  while (j--) {
    particles[j].draw();
    particles[j].update(j);
  }
}

function launchFirework() {
  const x = random(0, backgroundCanvas.width);
  const y = backgroundCanvas.height;
  const targetX = random(0, backgroundCanvas.width);
  const targetY = random(0, backgroundCanvas.height / 2);
  fireworks.push(new Firework(x, y, targetX, targetY));
  setTimeout(launchFirework, random(50, 700)); // Launch another firework after a random delay
}

function starynight(){
  let cellsize = 20;
  let rows = Math.floor(this.height / cellsize);
  let cols = Math.floor(this.width / cellsize);

  for(let y = 0; y <= rows; y++){
    for(let x = 0; x <= cols; x++){
      backgroundCtx.beginPath();
      backgroundCtx.arc(x, y, 3, 0, 2 * Math.PI);
      backgroundCtx.fillStyle = "white";
      backgroundCtx.stroke();
    }
  }
}