particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
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
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "mousemove": {
        "enable": true,
        "mode": "grab"
      }
    },
    "modes": {
      "repulse": {
        "distance": 100,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "grab": {
        "distance": 200,
        "line_linked": {
          "opacity": 1
        }
      }
    }
  },
  "retina_detect": true
});

