document.addEventListener('DOMContentLoaded', function () {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const mainContainer = document.querySelector("main");

  // Load user's saved preference on page load
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = 'Light Mode';
  } else {
    darkModeToggle.textContent = 'Dark Mode';
  }

  // Toggle dark mode and button text dynamically
  darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.textContent = 'Light Mode';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.textContent = 'Dark Mode';
    }
  });

  // 🎆 Cursor-based Particle Interaction
  document.addEventListener("mousemove", function(event) {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      window.pJSDom[0].pJS.interactivity.mouse.pos_x = mouseX;
      window.pJSDom[0].pJS.interactivity.mouse.pos_y = mouseY;
      window.pJSDom[0].pJS.interactivity.status = "mousemove";
    }
  });

  document.addEventListener("mouseleave", function () {
    window.pJSDom[0].pJS.interactivity.mouse.pos_x = null;
    window.pJSDom[0].pJS.interactivity.mouse.pos_y = null;
    window.pJSDom[0].pJS.interactivity.status = "mouseleave";
  });
});

