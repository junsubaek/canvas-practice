const canvas = document.querySelector(".canvas");
const generateButton = document.querySelector(".generate-tree-button");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let curve;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.shadowBlur = 5;
  ctx.shadowColor = "white";
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  //   ctx.lineTo(0, -len);
  if (angle > 0) {
    ctx.bezierCurveTo(10, -len / 2, -10, -len / 2, 0, -len);
  } else {
    ctx.bezierCurveTo(10, -len / 2, 10, -len / 2, 0, -len);
  }

  ctx.stroke();

  if (len < 10) {
    ctx.beginPath();
    ctx.arc(0, -len, 20, 0, Math.PI / 2);
    ctx.fill();
    ctx.restore();
    return;
  }
  curve = Math.random() * 10 + 10;
  drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.5);
  drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.5);

  ctx.restore();
}

drawTree(canvas.width / 2, canvas.height - 80, 180, 0, 20, "brown", "green");

function generateRandomTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //startX, startY, len, angle, branchWidth, color1, color2
  let centerPointX = canvas.width / 2;
  let len = Math.floor(Math.random() * 80 + 100);
  let angle = 0;
  let branchWidth = Math.random() * 70 + 1;
  let color1 = `rgb(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  })`;
  let color2 = `rgb(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  })`;
  generateButton.style.background = color1;

  drawTree(
    centerPointX,
    canvas.height - 80,
    len,
    angle,
    branchWidth,
    color1,
    color2
  );
}

generateButton.addEventListener("click", generateRandomTree);
