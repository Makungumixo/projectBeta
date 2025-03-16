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

  // 🎉 Cursor-based 3D Effect
  document.addEventListener("mousemove", (event) => {
    let xAxis = (window.innerWidth / 2 - event.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - event.pageY) / 25;

    mainContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  // Reset the tilt when the mouse leaves
  document.addEventListener("mouseleave", () => {
    mainContainer.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
});

