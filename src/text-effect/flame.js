function startBurningEffect(text) {
  let img;
  const loc = [];
  class P {
    constructor(x, y, h) {
      this.x = x;
      this.y = y;
      this.ox = x;
      this.oy = y;
      this.h = h;
      this.r = 3 + Math.random() * 5;
      this.vx = Math.random() * 2 - 1;
      this.vy = -1 + Math.random() * -2;
      this.a = 1;
      this.as = 0.6 + Math.random() * 0.1;
      this.s = 1;
      this.ss = 0.98;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.a *= this.as;
      this.s *= this.ss;
      this.h += 0.5;
      if (this.y < 0 || this.a < 0.01 || this.s < 0.01) {
        this.x = this.ox;
        this.y = this.oy;
        this.a = 1;
        this.s = 1;
        this.r = 3 + Math.random() * 5;
        this.vx = Math.random() * 2 - 1;
        this.vy = -1 + Math.random() * -2;
        this.as = 0.6 + Math.random() * 0.1;
      }
    }
    render(ctx) {
      ctx.save();
      ctx.fillStyle = `hsla(${this.h}, 100%, 50%, ${this.a})`;
      ctx.translate(this.x, this.y);
      ctx.scale(this.s, this.s);
      ctx.beginPath();
      ctx.arc(0, 0, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  ctx.font = "140px Verdana";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, c.width / 2, c.height / 2);
  img = ctx.getImageData(0, 0, c.width, c.height).data;
  ctx.clearRect(0, 0, c.width, c.height);

  for (let y = 0; y < c.height; y += 1) {
    for (let x = 0; x < c.width; x += 1) {
      const idx = (x + y * c.width) * 4 - 1;
      if (img[idx] > 0) {
        loc.push({ x, y });
      }
    }
  }

  const ctr = 900;
  const ps = [];
  const hue = Math.random() * 360;

  for (let i = 0; i < ctr; i++) {
    const lc = loc[Math.floor(Math.random() * loc.length)];
    const p = new P(lc.x, lc.y, hue);
    ps.push(p);
  }

  requestAnimationFrame(function loop() {
    requestAnimationFrame(loop);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0, len = ps.length; i < len; i++) {
      const p = ps[i];
      p.update();
      p.render(ctx);
    }
  });
}

window.te_select = function () {
  const select = document.getElementById("TESelector");
  const value = select.value;
  const text = userInput.value;

  const burningCanvas = document.getElementById("burningCanvas");
  if (value === "burn") {
    burningCanvas.style.display = "block";
    startBurningEffect(text);
  } else {
    burningCanvas.style.display = "none";
  }
};
