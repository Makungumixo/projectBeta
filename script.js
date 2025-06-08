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

    // 🎆 Cursor-based Particle Interaction for tsParticles
    document.addEventListener("mousemove", function(event) {
        const canvas = document.querySelector("canvas");
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (window.pJSDom && window.pJSDom[0]) {
                const pJS = window.pJSDom[0].pJS;
                pJS.interactivity.mouse.pos_x = mouseX;
                pJS.interactivity.mouse.pos_y = mouseY;
                pJS.interactivity.status = "mousemove";
            }
        }
    });

    document.addEventListener("mouseleave", function () {
        if (window.pJSDom && window.pJSDom[0]) {
            const pJS = window.pJSDom[0].pJS;
            pJS.interactivity.mouse.pos_x = null;
            pJS.interactivity.mouse.pos_y = null;
            pJS.interactivity.status = "mouseleave";
        }
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

    // ✅ Make PDF Modal Draggable (Fixed)
    let isDragging = false;
    let throttleTimeout;

    pdfHeader.addEventListener("mousedown", function (e) {
        let shiftX = e.clientX - pdfModal.getBoundingClientRect().left;
        let shiftY = e.clientY - pdfModal.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            pdfModal.style.left = pageX - shiftX + "px";
            pdfModal.style.top = pageY - shiftY + "px";
        }

        function onMouseMove(event) {
            if (!isDragging) return;
            if (throttleTimeout) clearTimeout(throttleTimeout);
            throttleTimeout = setTimeout(() => moveAt(event.pageX, event.pageY), 10);
        }

        isDragging = true;
        document.addEventListener("mousemove", onMouseMove);

        pdfHeader.addEventListener("mouseup", function () {
            isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
        });

        pdfHeader.addEventListener("mouseleave", function () {
            isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
        });
    });
});



