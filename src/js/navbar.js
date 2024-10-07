document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector('.navbar');
    var mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    var navItems = document.querySelectorAll('.nav-item.has-submenu');
    var submenuLinks = document.querySelectorAll('.submenu a');
    var navLinksContainer = document.querySelector('.nav-links-container');
    var submenuTimeout;



    function isMobileView() {
        return window.matchMedia('(max-width: 810px)').matches;
    }

    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }

    // Toggle Mobile Navigation Menu
    mobileMenuIcon.addEventListener('click', function() {
        var isActive = navbar.classList.toggle('mobile-nav-active');
        mobileMenuIcon.classList.toggle('is-active');
        mobileMenuIcon.setAttribute('aria-expanded', isActive);

        document.body.classList.toggle('mobile-nav-active', isActive);

        // Remove 'mobile-submenu-active' class from all nav items when closing
        if (!isActive) {
            navItems.forEach(function(item) {
                item.classList.remove('mobile-submenu-active');
            });

            // Remove 'submenu-open' class from navbar
            navbar.classList.remove('submenu-open');
        }
    });

    // Toggle Submenus on Mobile
    navItems.forEach(function(item) {
        var link = item.querySelector('.nav-link');
        var submenu = item.querySelector('.submenu');

        if (submenu) {
            link.addEventListener('click', function(event) {
                if (isMobileView()) {
                    event.preventDefault();
                    item.classList.toggle('mobile-submenu-active');
                }
            });
        }
    });

    // Close mobile menu when a submenu link is clicked
    submenuLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            if (isMobileView()) {
                // Do not prevent default; allow navigation to proceed
                // Simulate a click on the mobile menu icon to close the menu
                mobileMenuIcon.click();
            }
        });
    });

    // Reset menu state on resize
    window.addEventListener('resize', function() {
        if (!isMobileView()) {
            // Close mobile menu and reset classes if the menu is active
            if (navbar.classList.contains('mobile-nav-active')) {
                mobileMenuIcon.click();
            }
        }
    });

    // Event listeners for submenu handling on desktop and touch devices
    if (navLinksContainer) {
        if (isTouchDevice()) {
            // For touch devices, use click events
            navItems.forEach(function(item) {
                var link = item.querySelector('.nav-link');
                var submenu = item.querySelector('.submenu');

                if (submenu) {
                    link.addEventListener('click', function(event) {
                        event.preventDefault();
                        // Close any other open submenus
                        navItems.forEach(function(navItem) {
                            if (navItem !== item) {
                                navItem.classList.remove('submenu-active');
                            }
                        });
                        // Toggle the submenu
                        item.classList.toggle('submenu-active');
                    });
                }
            });

            // Close submenu when clicking outside
            document.addEventListener('click', function(event) {
                var isClickInside = navbar.contains(event.target);
                if (!isClickInside) {
                    navItems.forEach(function(item) {
                        item.classList.remove('submenu-active');
                    });
                }
            });
        } else {
            // For non-touch devices, use hover events
            navLinksContainer.addEventListener('mouseenter', showSubmenus);
            navLinksContainer.addEventListener('mouseleave', hideSubmenus);
        }
    }

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

    // Function to show submenus (for desktop hover, if applicable)
    function showSubmenus() {
        clearTimeout(submenuTimeout);
        navbar.classList.add('submenu-open');
    }

    // Function to hide submenus (for desktop hover, if applicable)
    function hideSubmenus() {
        clearTimeout(submenuTimeout);
        submenuTimeout = setTimeout(function() {
            navbar.classList.remove('submenu-open');
        }, 200);
    }

    // Event listeners for submenu handling on desktop (if applicable)
    var navLinksContainer = document.querySelector('.nav-links-container');
    if (navLinksContainer) {
        navLinksContainer.addEventListener('mouseenter', showSubmenus);
        navLinksContainer.addEventListener('mouseleave', hideSubmenus);
    }
});
