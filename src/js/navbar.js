document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector('.navbar');
    var mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    var submenuTimeout;

    // Toggle Mobile Navigation Menu
    mobileMenuIcon.addEventListener('click', function() {
        var isActive = navbar.classList.toggle('mobile-nav-active');
        document.body.classList.toggle('mobile-nav-active');
        mobileMenuIcon.classList.toggle('is-active');
        mobileMenuIcon.setAttribute('aria-expanded', isActive);
    });

    // Toggle Submenus on Mobile
    var navItems = document.querySelectorAll('.nav-item.has-submenu');
    navItems.forEach(function(item) {
        var link = item.querySelector('.nav-link');
        link.addEventListener('click', function(event) {
            if (window.innerWidth <= 810) {
                event.preventDefault();
                item.classList.toggle('mobile-submenu-active');
            }
        });
    });

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
        }, 200);
    }

    // Event listeners for submenu handling
    var navLinksContainer = document.querySelector('.nav-links-container');
    navLinksContainer.addEventListener('mouseenter', showSubmenus);
    navLinksContainer.addEventListener('mouseleave', hideSubmenus);
});
