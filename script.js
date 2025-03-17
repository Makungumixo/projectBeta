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

    // ✅ PDF Viewer Functions
    window.showPDF = function (pdfUrl) {
        pdfViewer.src = pdfUrl + "#toolbar=0";  // Prevents download button
        pdfModal.style.display = "flex";
        pdfModal.classList.remove("minimized"); // Ensure modal is fully visible
    };

    window.closePDF = function () {
        pdfModal.style.display = "none";
        pdfViewer.src = "";  // Clears PDF when closing
    };

    window.minimizePDF = function () {
        pdfModal.classList.add("minimized");
    };

    window.maximizePDF = function () {
        pdfModal.classList.remove("minimized");
    };

    // ✅ Make PDF Modal Draggable (Now FIXED)
    pdfHeader.addEventListener("mousedown", function (e) {
        let shiftX = e.clientX - pdfModal.getBoundingClientRect().left;
        let shiftY = e.clientY - pdfModal.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            pdfModal.style.left = pageX - shiftX + "px";
            pdfModal.style.top = pageY - shiftY + "px";
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener("mousemove", onMouseMove);

        pdfHeader.addEventListener("mouseup", function () {
            document.removeEventListener("mousemove", onMouseMove);
        });

        pdfHeader.addEventListener("mouseleave", function () {
            document.removeEventListener("mousemove", onMouseMove);
        });
    });

});



