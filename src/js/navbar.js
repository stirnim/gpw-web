document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector('.navbar');
    var navItems = document.querySelectorAll('.nav-item.has-submenu');
    var submenuTimeout;
    var submenuOpen = false;

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
        if (!submenuOpen) {
            navbar.classList.add('submenu-open');
            submenuOpen = true;
        }
    }

    // Function to hide the submenu after a delay
    function hideSubmenu() {
        submenuTimeout = setTimeout(function() {
            navbar.classList.remove('submenu-open');
            submenuOpen = false;
        }, 400); // Adjust the delay as needed
    }

    // Function to check if the mouse is moving within the submenu area
    function isMouseInside(event, parent) {
        var relatedTarget = event.relatedTarget;
        while (relatedTarget) {
            if (relatedTarget === parent) {
                return true;
            }
            relatedTarget = relatedTarget.parentNode;
        }
        return false;
    }

    // Add event listeners to nav-items and their submenus
    navItems.forEach(function(item) {
        var submenu = item.querySelector('.submenu');

        item.addEventListener('mouseover', function(event) {
            showSubmenu();
        });

        item.addEventListener('mouseout', function(event) {
            if (!isMouseInside(event, item)) {
                hideSubmenu();
            }
        });

        if (submenu) {
            submenu.addEventListener('mouseover', function(event) {
                showSubmenu();
            });

            submenu.addEventListener('mouseout', function(event) {
                if (!isMouseInside(event, item)) {
                    hideSubmenu();
                }
            });
        }
    });
});
