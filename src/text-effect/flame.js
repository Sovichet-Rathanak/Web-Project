//flame.js
function startBurningEffect(text, flamecolor, font, size, xPos, yPos) {
  updateCanvas(userInput.value, textColor.value, fontSelector.value, fontsize.value);
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
    render(textCtx) {
      textCtx.save();
      textCtx.fillStyle = `hsla(${this.h}, 100%, 50%, ${this.a})`;
      textCtx.translate(this.x, this.y);
      textCtx.scale(this.s, this.s);
      textCtx.beginPath();
      textCtx.arc(0, 0, this.r, 0, Math.PI * 2);
      textCtx.fill();
      textCtx.restore();
    }
  }

  // Set font properties
  textCtx.font = `${size}px '${font}'`;
  textCtx.textAlign = "center";
  textCtx.textBaseline = "middle";
  textCtx.fillStyle = flamecolor;

  textCtx.fillText(text, xPos, yPos);
  img = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height).data;
  textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);

  for (let y = 0; y < textCanvas.height; y += 1) {
    for (let x = 0; x < textCanvas.width; x += 1) {
      const idx = (x + y * textCanvas.width) * 4 - 1;
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
    textCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
    textCtx.fillRect(0, 0, textCanvas.width, textCanvas.height);
    textCtx.globalCompositeOperation = "lighter";
    clear();
    requestAnimationFrame(loop);
    for (let i = 0, len = ps.length; i < len; i++) {
      const p = ps[i];
      p.update();
      p.render(textCtx);
    }
  });
}
