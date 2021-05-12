const image = new Image();
image.src = "cyberpunk.jpeg";
image.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 706;
  //   const gradient1 = ctx.createLinearGradient(0, 0, 0, canvas.height);
  //   gradient1.addColorStop(0.2, "pink");
  //   gradient1.addColorStop(0.3, "red");
  //   gradient1.addColorStop(0.4, "orange");
  //   gradient1.addColorStop(0.5, "yellow");
  //   gradient1.addColorStop(0.6, "green");
  //   gradient1.addColorStop(0.7, "turquoise");
  //   gradient1.addColorStop(0.8, "violet");
  let particlesArray = [];
  let mappedImage = [];
  const numberOfParticles = 5000;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let switcher = 1;
  let counter = 0;
  setInterval(() => {
    counter++;
    if (counter % 12 === 0) {
      switcher *= -1;
    }
  }, 500);

  for (let y = 0; y < canvas.height; y++) {
    let row = [];
    for (let x = 0; x < canvas.width; x++) {
      const red = pixels.data[y * 4 * pixels.width + x * 4];
      const green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
      const blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];
      const brightness = calculateRelativeBrightness(red, green, blue);
      const cell = [
        (cellBrightness = brightness),
        (cellColor = `rgb(${red},${green},${blue})`),
      ];
      //   console.log(cell);
      row.push(cell);
    }
    mappedImage.push(row);
  }

  function calculateRelativeBrightness(red, green, blue) {
    return (
      Math.sqrt(
        red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
      ) / 100
    );
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.speed = 0;
      this.velocity = Math.random() * 2;
      this.size = Math.random() * 1.5 + 3;
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
      this.angle = 0;
    }

    update() {
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
      if (
        mappedImage[this.position1] &&
        mappedImage[this.position1][this.position2]
      ) {
        this.speed = mappedImage[this.position1][this.position2][0];
      }

      let movement = 2.5 - this.speed + this.velocity;
      this.angle += this.speed / 20;
      this.size = this.speed * 2.5;

      //   if (switcher === 1) {
      //     ctx.globalCompositeOperation = "luminosity";
      //   } else {
      //     ctx.globalCompositeOperation = "soft-light";
      //   }
      //   if (counter % 22 === 0) {
      //     this.x = Math.random() * canvas.width;
      //     this.y = 0;
      //   }

      this.y += movement;
      //   this.y += movement + Math.sin(this.angle) * 2;
      //   this.x += movement;
      this.x += movement + Math.sin(this.angle) * 2;

      if (this.x <= 0) {
        this.y = canvas.height;
        this.x = Math.random() * canvas.width;
      }

      if (this.x >= canvas.width) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      }

      //   if (this.y >= canvas.height) {
      //     this.y = 0;
      //     this.x = Math.random() * canvas.width;
      //   }

      //   if (this.x >= canvas.width) {
      //     this.x = 0;
      //     this.y = Math.random() * canvas.height;
      //   }
    }

    draw() {
      ctx.beginPath();
      if (
        mappedImage[this.position1] &&
        mappedImage[this.position1][this.position2]
      ) {
        ctx.fillStyle = mappedImage[this.position1][this.position2][1];
        // ctx.fillStyle = gradient1;
      }
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  init();

  function animate() {
    // ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.globalAlpha = 0.2;
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      //   ctx.globalAlpha = 0.05;
      ctx.globalAlpha = particlesArray[i].speed;
      particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
});
