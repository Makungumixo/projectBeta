const canvas = document.getElementById("solar-system-canvas");
const ctx = canvas.getContext("2d");

let planets = [];
const sun = { x: 0, y: 0, radius: 30, color: "#ffaa00" };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  sun.x = canvas.width / 2;
  sun.y = canvas.height / 2;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create orbiting planets
function initPlanets() {
  planets = [
    { radius: 5, orbit: 60, speed: 0.01, angle: 0, color: "#6ec6ff" },
    { radius: 7, orbit: 100, speed: 0.007, angle: Math.PI, color: "#90caf9" },
    { radius: 9, orbit: 150, speed: 0.005, angle: Math.PI / 2, color: "#f48fb1" },
    { radius: 12, orbit: 200, speed: 0.003, angle: 0, color: "#ce93d8" }
  ];
}
initPlanets();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the sun
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
  ctx.fillStyle = sun.color;
  ctx.fill();

  // Draw planets
  planets.forEach(p => {
    p.angle += p.speed;
    const x = sun.x + Math.cos(p.angle) * p.orbit;
    const y = sun.y + Math.sin(p.angle) * p.orbit;

    ctx.beginPath();
    ctx.arc(x, y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}
draw();
