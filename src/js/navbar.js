document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector('.navbar');
    var navItems = document.querySelectorAll('.nav-item.has-submenu');

    // Function to handle scroll event
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add event listeners to show/hide the gradient when submenu is open
    navItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            navbar.classList.add('submenu-open');
        });
        item.addEventListener('mouseleave', function() {
            navbar.classList.remove('submenu-open');
        });
    });
});
