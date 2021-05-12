const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArr = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.radian = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.speedX = Math.cos(this.radian) * 100;
    this.speedY = Math.sin(this.radian) * 100;
  }

  update() {
    this.radian += 0.05;
    this.x += Math.cos(this.radian) * 10;
    this.y += Math.sin(this.radian) * 10;
    console.log(this.x);
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticle() {
  const particle = new Particle(canvas.width / 2, canvas.height / 2);
  particlesArr.push(particle);
}
createParticle();

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArr.length; i++) {
    particlesArr[i].update();
    particlesArr[i].draw();
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
