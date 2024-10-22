window.addEventListener('load', rearrangeGallery);
window.addEventListener('resize', rearrangeGallery);

function rearrangeGallery() {
    // Get the gallery-grid element
    const galleryGrid = document.querySelector('.gallery-grid');

    // Get all images
    let images = Array.from(galleryGrid.querySelectorAll('img'));

    // Ensure all images are loaded before proceeding
    let imagesLoaded = 0;
    images.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                proceed();
            }
        } else {
            img.addEventListener('load', () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    proceed();
                }
            });
            img.addEventListener('error', () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    proceed();
                }
            });
        }
    });

    function proceed() {
        // Determine the number of columns per row based on the viewport width
        let columnsPerRow = window.innerWidth > 810 ? 4 : 3;

        // Reset the gallery-grid content
        galleryGrid.innerHTML = '';

        // Assign classes to images based on their aspect ratio
        images.forEach(img => {
            img.classList.remove('portrait', 'landscape', 'full-width');
            // Calculate aspect ratio
            let aspectRatio = img.naturalWidth / img.naturalHeight;
            if (aspectRatio >= 1) {
                // Landscape image
                img.classList.add('landscape');
            } else {
                // Portrait image
                img.classList.add('portrait');
            }
        });

        // Build rows according to the specified layout rules
        let arrangedImages = buildRows(images, columnsPerRow);

        // Append the rearranged images back to the gallery-grid
        arrangedImages.forEach(img => {
            galleryGrid.appendChild(img);
        });
    }
}

function buildRows(images, columnsPerRow) {
    let rows = [];
    let currentRow = [];
    let columnsFilled = 0;
    let startWithPortrait = true; // Alternate starting image type

    let index = 0;
    while (index < images.length) {
        let img = images[index];
        let columnSpan = getColumnSpan(img, columnsPerRow);

        if (columnsFilled + columnSpan > columnsPerRow) {
            // Current image doesn't fit, start a new row
            // But first, adjust the current row if necessary
            if (columnsFilled < columnsPerRow) {
                // Try to fill the row by moving images from future indices
                let lookaheadIndex = index + 1;
                while (columnsFilled < columnsPerRow && lookaheadIndex < images.length) {
                    let nextImg = images[lookaheadIndex];
                    let nextColumnSpan = getColumnSpan(nextImg, columnsPerRow);
                    if (columnsFilled + nextColumnSpan <= columnsPerRow) {
                        currentRow.push(nextImg);
                        columnsFilled += nextColumnSpan;
                        images.splice(lookaheadIndex, 1); // Remove from future images
                    } else {
                        lookaheadIndex++;
                    }
                }
            }

            // Add the current row to rows
            rows.push(currentRow);

            // Start a new row
            currentRow = [];
            columnsFilled = 0;

            // Alternate starting image type for next row
            startWithPortrait = !startWithPortrait;
            continue;
        }

        currentRow.push(img);
        columnsFilled += columnSpan;
        index++;
    }

    // Add the last row
    if (currentRow.length > 0) {
        // If the last row is not full, try to fill it
        if (columnsFilled < columnsPerRow) {
            // Try to fill the row by moving images from earlier rows
            let lookbackIndex = images.length - 1;
            while (columnsFilled < columnsPerRow && lookbackIndex >= index) {
                let img = images[lookbackIndex];
                let columnSpan = getColumnSpan(img, columnsPerRow);
                if (columnsFilled + columnSpan <= columnsPerRow) {
                    currentRow.push(img);
                    columnsFilled += columnSpan;
                    images.splice(lookbackIndex, 1);
                }
                lookbackIndex--;
            }
        }
        rows.push(currentRow);
    }

    // Adjust images for full-width in mobile view if necessary
    if (columnsPerRow === 3) {
        rows.forEach(row => {
            // If a landscape image is alone in a row, make it full-width
            if (row.length === 1 && row[0].classList.contains('landscape')) {
                row[0].classList.add('full-width');
            }
        });
    }

    // Alternate the order of images in each row for visual appeal
    rows.forEach((row, index) => {
        if (index % 2 === 0) {
            row.reverse();
        }
    });

    // Flatten the array of rows into a single array of images
    return rows.flat();
}

function getColumnSpan(img, columnsPerRow) {
    if (img.classList.contains('portrait')) {
        return 1;
    } else if (img.classList.contains('landscape')) {
        if (columnsPerRow === 3 && img.classList.contains('full-width')) {
            return 3;
        }
        return 2;
    }
    return 1;
}
