document.addEventListener("DOMContentLoaded", function() {
    var accordionSections = document.querySelectorAll('.accordion-section');

    function expandSection(section) {
        // Collapse all sections
        accordionSections.forEach(function(s) {
            s.classList.remove('expanded');
            var btn = s.querySelector('.accordion-toggle-button');
            var link = s.querySelector('.accordion-toggle-link');
            if (btn) {
                var img = btn.querySelector('img');
                if (img) img.setAttribute('src', 'images/expand_icon_darkforest.svg');
                btn.setAttribute('aria-label', 'Mehr Infos');
            }
            if (link) link.setAttribute('aria-expanded', 'false');
        });

        // Expand the specified section
        section.classList.add('expanded');
        var toggleButton = section.querySelector('.accordion-toggle-button');
        var toggleLink = section.querySelector('.accordion-toggle-link');
        if (toggleButton) {
            var img = toggleButton.querySelector('img');
            if (img) img.setAttribute('src', 'images/collapse_icon_darkforest.svg');
            toggleButton.setAttribute('aria-label', 'Weniger Infos');
        }
        if (toggleLink) toggleLink.setAttribute('aria-expanded', 'true');

        // Optional: Scroll to the expanded section
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function collapseSection(section, toggleButton) {
        section.classList.remove('expanded');
        if (toggleButton) {
            var img = toggleButton.querySelector('img');
            if (img) img.setAttribute('src', 'images/expand_icon_darkforest.svg');
            toggleButton.setAttribute('aria-label', 'Mehr Infos');
        }
        var toggleLink = section.querySelector('.accordion-toggle-link');
        if (toggleLink) toggleLink.setAttribute('aria-expanded', 'false');

        // Remove the hash from the URL
        history.pushState(null, null, window.location.pathname);

        // Wait for the collapse animation to finish
        var fullContent = section.querySelector('.accordion-full-content');
        var transitionDuration = getTransitionDuration(fullContent);

        setTimeout(function() {
            // Scroll to the toggle button
            toggleButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, transitionDuration);
    }

    // Function to get the transition duration from the CSS
    function getTransitionDuration(element) {
        var computedStyle = window.getComputedStyle(element);
        var duration = computedStyle.transitionDuration;
        var delay = computedStyle.transitionDelay;

        var totalDuration = 0;

        if (duration) {
            var durationSeconds = parseFloat(duration);
            var delaySeconds = parseFloat(delay) || 0;
            totalDuration = (durationSeconds + delaySeconds) * 1000; // Convert to milliseconds
        }

        return totalDuration;
    }

    // Event listener for toggle buttons
    accordionSections.forEach(function(section) {
        var toggleLink = section.querySelector('.accordion-toggle-link');
        var toggleButton = section.querySelector('.accordion-toggle-button');

        toggleLink.addEventListener('click', function(event) {
            event.preventDefault();
            var isExpanded = section.classList.contains('expanded');
            var sectionId = section.getAttribute('id');

            if (!isExpanded) {
                expandSection(section);

                // Update the URL hash without reloading the page
                history.pushState(null, null, '#' + sectionId);
            } else {
                // Collapse the section and handle scrolling
                collapseSection(section, toggleButton);
            }
        });
    });

    // Handle hash changes
    function handleHashChange() {
        var hash = window.location.hash;
        if (hash) {
            var targetSection = document.querySelector(hash);
            if (targetSection && targetSection.classList.contains('accordion-section')) {
                expandSection(targetSection);
            }
        } else {
            // If no hash, collapse all sections
            accordionSections.forEach(function(s) {
                s.classList.remove('expanded');
                var btn = s.querySelector('.accordion-toggle-button');
                var link = s.querySelector('.accordion-toggle-link');
                if (btn) {
                    var img = btn.querySelector('img');
                    if (img) img.setAttribute('src', 'images/expand_icon_darkforest.svg');
                    btn.setAttribute('aria-label', 'Mehr Infos');
                }
                if (link) link.setAttribute('aria-expanded', 'false');
            });
        }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Initial check on page load
    handleHashChange();
});
