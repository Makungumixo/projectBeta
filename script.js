document.addEventListener("DOMContentLoaded", function () {
    console.log("Website Loaded!");
    
    // ✅ Create & Style Dark Mode Button
    const themeToggle = document.createElement("button");
    themeToggle.innerText = "Toggle Dark Mode";
    themeToggle.id = "dark-mode-toggle";
    document.body.appendChild(themeToggle);

    // ✅ Check & Apply User’s Theme Preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // ✅ Toggle Dark Mode & Save Preference
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });

    // ✅ Scroll Fade-In Effect for Sections
    const sections = document.querySelectorAll("section");
    
    function fadeInOnScroll() {
        sections.forEach(section => {
            const sectionPos = section.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            if (sectionPos < screenPos) {
                section.classList.add("fade-in");
            }
        });
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll();

    // ✅ Parallax Scrolling Effect
    window.addEventListener("scroll", function () {
        let scrollPosition = window.pageYOffset;
        document.body.style.backgroundPositionY = -(scrollPosition * 0.3) + "px";
    });
});
