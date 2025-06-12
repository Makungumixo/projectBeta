document.addEventListener('DOMContentLoaded', function () {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const pdfModal = document.getElementById("pdf-modal");
  const pdfViewer = document.getElementById("pdf-viewer");
  const pdfHeader = document.getElementById("pdf-header");
  const profilePic = document.querySelector('.profile-pic');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  // ✅ Load Dark Mode Preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = 'Light Mode';
  } else {
    darkModeToggle.textContent = 'Dark Mode';
  }

  // ✅ Dark Mode Toggle
  darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    darkModeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  });

  // ✅ ParticleJS Mouse Interaction
  document.addEventListener("mousemove", function (event) {
    const canvas = document.querySelector("canvas");
    if (canvas && window.pJSDom && window.pJSDom.length > 0) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const interactivity = window.pJSDom[0].pJS.interactivity;
      interactivity.mouse.pos_x = mouseX;
      interactivity.mouse.pos_y = mouseY;
      interactivity.status = "mousemove";
    }
  });

  document.addEventListener("mouseleave", function () {
    if (window.pJSDom && window.pJSDom.length > 0) {
      const interactivity = window.pJSDom[0].pJS.interactivity;
      interactivity.mouse.pos_x = null;
      interactivity.mouse.pos_y = null;
      interactivity.status = "mouseleave";
    }
  });

  // ✅ PDF Viewer Functions
  window.showPDF = function (pdfUrl) {
    pdfViewer.src = pdfUrl + "#toolbar=0";
    pdfModal.style.display = "flex";
    pdfModal.classList.remove("minimized");
  };

  window.closePDF = function () {
    pdfModal.style.display = "none";
    pdfViewer.src = "";
  };

  window.minimizePDF = function () {
    pdfModal.classList.add("minimized");
  };

  window.maximizePDF = function () {
    pdfModal.classList.remove("minimized");
  };

  // ✅ Make PDF Modal Draggable
  pdfHeader.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const shiftX = e.clientX - pdfModal.getBoundingClientRect().left;
    const shiftY = e.clientY - pdfModal.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      const left = Math.min(Math.max(0, pageX - shiftX), window.innerWidth - pdfModal.offsetWidth);
      const top = Math.min(Math.max(0, pageY - shiftY), window.innerHeight - pdfModal.offsetHeight);

      pdfModal.style.left = `${left}px`;
      pdfModal.style.top = `${top}px`;
      pdfModal.style.transform = '';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // ✅ Escape Key Closes PDF
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal.style.display === 'flex') {
      window.closePDF();
    }
  });

  // ✅ Reset Modal Position on Double Click
  pdfHeader.addEventListener('dblclick', () => {
    pdfModal.style.top = '50px';
    pdfModal.style.left = '50%';
    pdfModal.style.transform = 'translateX(-50%)';
  });

  // ✅ Profile Picture Zoom
  if (profilePic) {
    profilePic.addEventListener('click', () => {
      profilePic.classList.toggle('enlarged');
    });
  }

  // ✅ Mobile Navigation Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    document.querySelectorAll('#nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }
});

//Container scrolling efferct
window.addEventListener('scroll', () => {
  const banner = document.getElementById('intro-banner');
  if (window.scrollY > 10) {
    banner.classList.add('hidden');
  } else {
    banner.classList.remove('hidden');
  }
});
//Logo-container scrolling effect->Includes profile picture
document.addEventListener('DOMContentLoaded', () => {
  const logoContainer = document.querySelector('.logo-container');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      logoContainer.classList.add('hide-on-scroll');
    } else {
      logoContainer.classList.remove('hide-on-scroll');
    }
  });
});

//THE SOLAR SYSTEM
const darkModeToggle = document.getElementById("dark-mode-toggle");
const solarCanvas = document.getElementById("solar-system-canvas");

function enableDarkMode() {
  document.body.classList.add("dark-mode");
  solarCanvas.style.display = "block";
}

function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  solarCanvas.style.display = "none";
}

darkModeToggle.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});





