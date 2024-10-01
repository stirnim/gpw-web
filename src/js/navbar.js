document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector('.navbar');
    var navLinksContainer = document.querySelector('.nav-links-container');
    var submenuTimeout;

    // Function to handle scroll event
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Function to show submenus
    function showSubmenus() {
        clearTimeout(submenuTimeout);
        navbar.classList.add('submenu-open');
    }

    // Function to hide submenus
    function hideSubmenus() {
        clearTimeout(submenuTimeout);
        submenuTimeout = setTimeout(function() {
            navbar.classList.remove('submenu-open');
        }, 200); // Adjust the delay as needed
    }

    // Event listeners on nav-links-container
    navLinksContainer.addEventListener('mouseenter', showSubmenus);
    navLinksContainer.addEventListener('mouseleave', hideSubmenus);
});
