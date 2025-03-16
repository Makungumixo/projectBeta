document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Load previously saved preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  // Toggle dark mode
  darkModeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.toggle('dark-mode');
    
    localStorage.setItem('darkMode', 
      document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled'
    );
  });
});

