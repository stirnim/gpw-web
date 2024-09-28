document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector('.navbar');
    var submenuItems = document.querySelectorAll('.has-submenu');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add event listeners to show/hide the extended gradient when submenu is open
    submenuItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            navbar.classList.add('submenu-open');
        });
        item.addEventListener('mouseleave', function() {
            navbar.classList.remove('submenu-open');
        });
    });
});
