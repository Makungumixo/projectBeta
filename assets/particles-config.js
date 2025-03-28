// 1. Initialize Particles normally:
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 80,
      "density": { "enable": true, "value_area": 800 }
    },
    "color": { "value": "#ffffff" },
    "shape": { "type": "triangle" },
    "opacity": { "value": 0.5, "random": true },
    "size": { "value": 5, "random": true },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "grab" },
      "onclick": { "enable": true, "mode": "push" }
    },
    "modes": {
      "grab": { "distance": 200, "line_linked": { "opacity": 1 } },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});

// 2. Force the Particles canvas to match the page height:
function resizeParticles() {
  // The outer container
  const container = document.getElementById('particles-js');
  // Set its height to the full document height:
  const pageHeight = Math.max(
    document.body.scrollHeight, 
    document.documentElement.scrollHeight
  );
  container.style.height = pageHeight + 'px';

  // Then forcibly tell Particles.js to recalc canvas size:
  if (window.pJSDom && window.pJSDom.length > 0) {
    const pJS = window.pJSDom[0].pJS;
    // Update the canvas element
    pJS.canvas.el.width = container.offsetWidth;
    pJS.canvas.el.height = container.offsetHeight;
    // Refresh the particle system
    pJS.fn.particlesRefresh();
  }
}

// 3. Listen for page load, resize, and scroll events:
window.addEventListener('DOMContentLoaded', resizeParticles);
window.addEventListener('load', resizeParticles);
window.addEventListener('resize', resizeParticles);
window.addEventListener('scroll', resizeParticles);

