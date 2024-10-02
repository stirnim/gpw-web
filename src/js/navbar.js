document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector('.navbar');
    var submenuTimeout;

    // Function to handle scroll event
    function handleScroll() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Check scroll position on page load
    handleScroll();

    // Add event listener for scroll event
    window.addEventListener('scroll', handleScroll);

    // Function to show submenus (from previous code)
    function showSubmenus() {
        clearTimeout(submenuTimeout);
        navbar.classList.add('submenu-open');
    }

    // Function to hide submenus (from previous code)
    function hideSubmenus() {
        clearTimeout(submenuTimeout);
        submenuTimeout = setTimeout(function() {
            navbar.classList.remove('submenu-open');
        }, 200); // Adjust the delay as needed
    }

    // Event listeners for submenu handling (from previous code)
    var navLinksContainer = document.querySelector('.nav-links-container');
    navLinksContainer.addEventListener('mouseenter', showSubmenus);
    navLinksContainer.addEventListener('mouseleave', hideSubmenus);
});
