document.addEventListener("DOMContentLoaded", function () {
    console.log("Website Loaded!");
    
    const themeToggle = document.createElement("button");
    themeToggle.innerText = "Toggle Dark Mode";
    themeToggle.style.position = "fixed";
    themeToggle.style.top = "20px";
    themeToggle.style.right = "20px";
    themeToggle.style.padding = "10px 15px";
    themeToggle.style.background = "#1f6feb";
    themeToggle.style.color = "white";
    themeToggle.style.border = "none";
    themeToggle.style.cursor = "pointer";
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    const sections = document.querySelectorAll("section");
    
    const fadeInOnScroll = () => {
        sections.forEach(section => {
            const sectionPos = section.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            if (sectionPos < screenPos) {
                section.classList.add("fade-in");
            }
        });
    };

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll();
});
