document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const pdfModal = document.getElementById("pdf-modal");
    const pdfViewer = document.getElementById("pdf-viewer");
    const pdfHeader = document.getElementById("pdf-header");

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

document.addEventListener('DOMContentLoaded', () => {
  const pdfModal = document.getElementById('pdf-modal');
  const pdfViewer = document.getElementById('pdf-viewer');
  const pdfHeader = document.getElementById('pdf-header');

  // ✅ PDF Viewer Functions
  window.showPDF = function (pdfUrl) {
    pdfViewer.src = pdfUrl + "#toolbar=0";  // Disable PDF toolbar buttons (like download)
    pdfModal.style.display = "flex";
    pdfModal.classList.remove("minimized"); // Make sure modal is fully visible
  };

  window.closePDF = function () {
    pdfModal.style.display = "none";
    pdfViewer.src = "";  // Clear PDF source when closing
  };

  window.minimizePDF = function () {
    pdfModal.classList.add("minimized");
  };

  window.maximizePDF = function () {
    pdfModal.classList.remove("minimized");
  };

  // ✅ Make PDF Modal Draggable (Fixed)
  pdfHeader.addEventListener('mousedown', (e) => {
    e.preventDefault();  // Prevent text selection

    // Calculate shift between mouse and modal's top-left corner
    let shiftX = e.clientX - pdfModal.getBoundingClientRect().left;
    let shiftY = e.clientY - pdfModal.getBoundingClientRect().top;

    // Move modal to follow mouse, within viewport bounds
    function moveAt(pageX, pageY) {
      const left = Math.min(
        Math.max(0, pageX - shiftX),
        window.innerWidth - pdfModal.offsetWidth
      );
      const top = Math.min(
        Math.max(0, pageY - shiftY),
        window.innerHeight - pdfModal.offsetHeight
      );

      pdfModal.style.left = left + 'px';
      pdfModal.style.top = top + 'px';
      pdfModal.style.transform = ''; // Remove centering transform on drag
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

  // Close PDF modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal.style.display === 'flex') {
      window.closePDF();
    }
  });

  // Double-click header to reset modal position (centered top)
  pdfHeader.addEventListener('dblclick', () => {
    pdfModal.style.top = '50px';
    pdfModal.style.left = '50%';
    pdfModal.style.transform = 'translateX(-50%)';
  });
});


const profilePic = document.querySelector('.profile-pic');
if (profilePic) {
  profilePic.addEventListener('click', () => {
    profilePic.classList.toggle('enlarged');
  });
}

const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

document.querySelectorAll('#nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });
});


