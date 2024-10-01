document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector('.navbar');
    var submenuTimeout;

    // Function to handle scroll event
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Function to show all submenus
    function showAllSubmenus() {
        clearTimeout(submenuTimeout);
        navbar.classList.add('submenu-open');
    }

    // Function to hide all submenus after a delay
    function hideAllSubmenus() {
        submenuTimeout = setTimeout(function() {
            navbar.classList.remove('submenu-open');
        }, 200); // Adjust the delay as needed
    }

    // Add event listeners to the navbar
    navbar.addEventListener('mouseenter', function() {
        showAllSubmenus();
    });

    navbar.addEventListener('mouseleave', function() {
        hideAllSubmenus();
    });
});
