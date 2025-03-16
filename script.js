
  document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  darkModeToggle.addEventListener('click', function(e) {
    e.preventDefault(); // prevents any default behavior
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', 
      document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled'
    );
  });
});


