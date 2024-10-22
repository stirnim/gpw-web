function adjustGalleryImages() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const images = Array.from(galleryGrid.querySelectorAll('img'));
    const isMobile = window.matchMedia('(max-width: 810px)').matches;
    const columns = isMobile ? 3 : 4;

    let colCounter = 0;

    for (let i = 0; i < images.length; i++) {
        let img = images[i];

        // Remove the 'full-width' class if it was previously added
        img.classList.remove('full-width');

        let colSpan = 1;
        if (img.classList.contains('landscape')) {
            colSpan = isMobile ? 2 : 2;
        }
        if (img.classList.contains('portrait')) {
            colSpan = 1;
        }

        // Check if the image fits in the current row
        if (colCounter + colSpan > columns) {
            // Reset the counter since we're on a new row
            colCounter = 0;
        }

        // Special case: If this is a landscape image at the start of a row
        if (colSpan === 2 && colCounter === 0) {
            let nextImg = images[i + 1];
            let nextColSpan = 0;

            if (nextImg) {
                if (nextImg.classList.contains('landscape')) {
                    nextColSpan = isMobile ? 2 : 2;
                }
                if (nextImg.classList.contains('portrait')) {
                    nextColSpan = 1;
                }
            }

            // Check if next image can fit in the remaining space
            if (colSpan + nextColSpan > columns) {
                // Not enough space for both images in this row
                img.classList.add('full-width');
                colSpan = columns; // Update colSpan since we've changed the class
            }
        }

        colCounter += colSpan;

        // Reset counter if we've filled the row
        if (colCounter >= columns) {
            colCounter = 0;
        }
    }
}

// Run the function on page load and on window resize
window.addEventListener('load', adjustGalleryImages);
window.addEventListener('resize', adjustGalleryImages);
