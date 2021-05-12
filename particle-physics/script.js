const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numberOfParticles = 300;

//타이틀 위치측정
let titleElement = document.getElementById("title1");
let titleMeasurements = titleElement.getBoundingClientRect();
let title = {
  x: titleMeasurements.left,
  y: titleMeasurements.top,
  width: titleMeasurements.width,
  height: 10,
};

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 15 + 1;
    this.weight = Math.random() * 5 + 1;
    this.directionX = 1;
  }

  update() {
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.weight = 2;
      this.x = Math.random() * canvas.width * 1.3;
    }
    this.weight += 0.01;
    this.y += this.weight;
    this.x += this.directionX;

    if (
      this.x < title.x + title.width &&
      this.x + this.size > title.x &&
      this.y < title.y + title.height &&
      this.y + this.size > title.y
    ) {
      this.y -= 3;
      this.weight *= -0.5;
    }
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particlesArray.push(new Particle(x, y));
  }
}
init();

const particle1 = new Particle(400, 900);
const particle2 = new Particle(100, 100);

function animate() {
  ctx.fillStyle = "rgba(255,255,255,0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  ctx.fillRect(title.x, title.y, title.width, title.height);
  requestAnimationFrame(animate);
}
// animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  titleMeasurements = titleElement.getBoundingClientRect();
  title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 10,
  };
  init();
});
