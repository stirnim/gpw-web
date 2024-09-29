document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector('.navbar');
    var navItems = document.querySelectorAll('.nav-item.has-submenu');
    var submenuTimeout;

    // Function to handle scroll event
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Function to show the submenu
    function showSubmenu() {
        clearTimeout(submenuTimeout);
        navbar.classList.add('submenu-open');
    }

    // Function to hide the submenu after a delay
    function hideSubmenu() {
        submenuTimeout = setTimeout(function() {
            navbar.classList.remove('submenu-open');
        }, 400); // Adjust the delay (in milliseconds) as needed
    }

    // Add event listeners to nav-items and their submenus
    navItems.forEach(function(item) {
        item.addEventListener('mouseenter', showSubmenu);
        item.addEventListener('mouseleave', hideSubmenu);

        var submenu = item.querySelector('.submenu');
        if (submenu) {
            submenu.addEventListener('mouseenter', showSubmenu);
            submenu.addEventListener('mouseleave', hideSubmenu);
        }
    });
});
