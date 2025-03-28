// Initialize Particles.js with your config
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 80,            // Optional: reduce to ~60 for faster performance on mobile
      "density": {
        "enable": true,
        "value_area": 800     // Increase to spread out the particles more
      }
    },
    "shape": {
      "type": "triangle"
    },
    "color": {
      "value": "#ffffff"
    },
    "opacity": {
      "value": 0.5,
      "random": true
    },
    "size": {
      "value": 5,
      "random": true
    },
    "move": {
      "enable": true,
      "speed": 2,            // Optional: set to 1 or 1.5 for slower, more relaxed movement
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
    "detect_on": "canvas",   // "window" can allow cross-canvas interaction, but "canvas" is typical
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      }
    },
    "modes": {
      "grab": {
        "distance": 200,
        "line_linked": {
          "opacity": 1
        }
      },
      "push": {
        "particles_nb": 4
      }
    }
  },
  "retina_detect": true
});
