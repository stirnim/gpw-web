/* gallery.js */

document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    let images = Array.from(galleryGrid.querySelectorAll('img'));

    // Function to determine image orientation
    const determineOrientation = (img) => {
        return new Promise((resolve) => {
            if (img.complete) {
                resolve(img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait');
            } else {
                img.onload = () => {
                    resolve(img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait');
                };
                img.onerror = () => {
                    // Default to portrait if image fails to load
                    resolve('portrait');
                };
            }
        });
    };

    // Assign orientation classes to images
    const assignOrientationClasses = async () => {
        const orientationPromises = images.map(img => determineOrientation(img));
        const orientations = await Promise.all(orientationPromises);
        images.forEach((img, index) => {
            img.classList.add(orientations[index]);
        });
    };

    // Function to arrange images into rows based on total grid span
    const arrangeImages = () => {
        const screenWidth = window.innerWidth;
        let maxSpanPerRow = 4; // Default for desktop

        // Adjust maxSpanPerRow based on screen size
        if (screenWidth <= 810) {
            maxSpanPerRow = 3; // 3 columns on medium screens
        }

        // Reset gallery grid
        galleryGrid.innerHTML = '';

        // Make a copy of images array to manipulate
        let remainingImages = [...images];
        let rows = [];

        // Initial row assignment
        while (remainingImages.length > 0) {
            let currentRow = [];
            let currentSpan = 0;

            for (let i = 0; i < remainingImages.length; i++) {
                const img = remainingImages[i];
                const isLandscape = img.classList.contains('landscape');
                const imgSpan = isLandscape ? 2 : 1;

                if (currentSpan + imgSpan <= maxSpanPerRow) {
                    currentRow.push(img);
                    currentSpan += imgSpan;
                    remainingImages.splice(i, 1);
                    i--; // Adjust index after removal
                }

                if (currentSpan === maxSpanPerRow) {
                    break; // Row is filled
                }
            }

            // If no image was added to the row (to prevent infinite loop), add the first image
            if (currentRow.length === 0 && remainingImages.length > 0) {
                currentRow.push(remainingImages.shift());
            }

            rows.push(currentRow);
        }

        // Post-Arrangement Adjustment: Ensure all but the last row are fully filled
        for (let i = 0; i < rows.length - 1; i++) { // Exclude the last row
            let currentRow = rows[i];
            let currentSpan = currentRow.reduce((sum, img) => sum + (img.classList.contains('landscape') ? 2 : 1), 0);
            let remainingSpan = maxSpanPerRow - currentSpan;

            if (remainingSpan > 0) {
                // Search in subsequent rows for images that can fit
                for (let j = i + 1; j < rows.length; j++) {
                    let targetRow = rows[j];
                    // Find the first image that can fit
                    let foundIndex = targetRow.findIndex(img => {
                        const span = img.classList.contains('landscape') ? 2 : 1;
                        return span <= remainingSpan;
                    });

                    if (foundIndex !== -1) {
                        // Move the image to the current row
                        let [movedImg] = targetRow.splice(foundIndex, 1);
                        currentRow.push(movedImg);
                        currentSpan += (movedImg.classList.contains('landscape') ? 2 : 1);
                        remainingSpan -= (movedImg.classList.contains('landscape') ? 2 : 1);

                        // If the target row is empty after removal, remove the row
                        if (targetRow.length === 0) {
                            rows.splice(j, 1);
                            j--; // Adjust index after removal
                        }

                        // Update the current row in the rows array
                        rows[i] = currentRow;
                        rows[j] = targetRow;

                        // If no remaining span, break
                        if (remainingSpan === 0) {
                            break;
                        }
                    }
                }
            }
        }

        // Append images row by row
        rows.forEach(row => {
            row.forEach(img => {
                galleryGrid.appendChild(img);
            });
        });
    };

    // Initialize the gallery
    const initGallery = async () => {
        await assignOrientationClasses();
        arrangeImages();
    };

    // Debounce function to limit the rate of function calls
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    };

    // Initialize on page load
    initGallery();

    // Re-arrange on window resize with debounce
    window.addEventListener('resize', debounce(() => {
        arrangeImages();
    }, 250));
});
