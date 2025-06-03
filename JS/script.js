document.addEventListener("contextmenu", function (e) {
  e.preventDefault(); // Prevent right-click
  // alert("Right Click Not Allowed");
});

document.onselectstart = (e) => {
  e.preventDefault(); // Prevent text selection
};

document.addEventListener("keydown", (e) => {
  // Prevent specific shortcuts like Ctrl+U and Ctrl+Shift+I
  if (
    (e.key.toLowerCase() === "u" && e.ctrlKey) || // Ctrl+U
    (e.key.toLowerCase() === "i" && e.ctrlKey && e.shiftKey) || // Ctrl+Shift+I
    e.key === "F12"
  ) {
    e.preventDefault();
    // alert("Shortcut Not Allowed");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  // Function to animate hamburger lines
  function animateHamburger(isOpen) {
    const lines = hamburger.querySelectorAll("span, div, .line, .bar");

    if (lines.length >= 3) {
      if (isOpen) {
        // Transform to X shape
        lines[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        lines[0].style.transition = "transform 0.3s ease";

        lines[1].style.opacity = "0";
        lines[1].style.transition = "opacity 0.3s ease";

        lines[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
        lines[2].style.transition = "transform 0.3s ease";
      } else {
        // Return to hamburger shape
        lines[0].style.transform = "rotate(0) translate(0, 0)";
        lines[0].style.transition = "transform 0.3s ease";

        lines[1].style.opacity = "1";
        lines[1].style.transition = "opacity 0.3s ease";

        lines[2].style.transform = "rotate(0) translate(0, 0)";
        lines[2].style.transition = "transform 0.3s ease";
      }
    }
  }

  hamburger.addEventListener("click", function () {
    const isActive = hamburger.classList.contains("active");

    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Animate hamburger based on new state
    animateHamburger(!isActive);
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");

      // Reset hamburger animation
      animateHamburger(false);
    });
  });

  // Smooth Scrolling
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - 70;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active Navigation Link
  window.addEventListener("scroll", function () {
    const scrollPos = window.scrollY + 100;

    navLinks.forEach((link) => link.classList.remove("active"));

    document.querySelectorAll("section[id]").forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
        const activeLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  });

  // Scroll Progress Bar
  window.addEventListener("scroll", function () {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector(".scroll-progress");
    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }
  });
});

// Smooth scroll animation for content blocks
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Initialize content blocks animation
document.querySelectorAll(".content-block").forEach((block, index) => {
  block.style.opacity = "0";
  block.style.transform = "translateY(50px)";
  block.style.transition = `all 0.6s ease ${index * 0.2}s`;
  observer.observe(block);
});

// Add mouse parallax effect
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  document.querySelectorAll(".floating-orb").forEach((orb, index) => {
    const speed = (index + 1) * 0.02;
    const x = (mouseX - 0.5) * speed * 100;
    const y = (mouseY - 0.5) * speed * 100;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
