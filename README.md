# Grand Prix Winterthur HTML Page

Source code of the website https://stage.gp-winterthur.ch/

## How to Use the CSS Classes

### General Structure
The HTML structure is divided into various sections, such as the header, content blocks, and footer. Each section uses specific classes for layout and styling.

### Page Styles
All static HTML files share a common structure within the HTML body. They start with the same navigation block and use the same footer. However, there are two different page content structures: one for the start page and another for all other pages. Below is an illustration of how these two page structures differ:

Start page:
- Navigation block
- Teaser-image block
- Color-transition block
- Header-wide block
- Any number of content blocks
- Footer block

Other pages:
- Navigation block
- Header-color-transition block
- Any number of content blocks
- Footer block

The navigation block has a different appearance on the start page. This is achieved by making the CSS dependent on the teaser-image block, as well as by utilizing JavaScript.

### Main Content Class Definitions

Any page can be filled with any number of content blocks. Below is a brief explanation of the main classes of these content blocks:

- **.image-columns**: Used to display multiple images in a column style on desktop or stacked vertically on mobile.
- **.text-columns**: Used for a two-column format where .column-one highlights the content with a subtitle in a circle and .column-two contains the main content.
- **.callout-action**: A full-width block in a different background color, with large centered text to make a callout action.
- **.text-wide**: A full-width content block. Similar to .text-columns, except it has just a single column.
- **.image-wide**:  A full-width image content block.
- **.gallery-wide**: A full-width grid layout for an image gallery.

## Images

### SVG
- SVG images have been optimized using https://svgomg.net/

### Image greyscale
To convert an image to greyscale, we use Photoshop and the Hue/Saturation Adjustment Layer:
- Step 1: Go to Layer > New Adjustment Layer > Hue/Saturation.
- Step 2: In the Hue/Saturation panel, drag the Saturation slider all the way to the left and the Lightness slider to +5.
- Step 3: Export as JPEG.

## Build and Publish

### Build
The source code for the website resides in the `src` directory. Use the command **`./build-web.sh`** to build static HTML files that can be directly opened in a web browser. The build files are created in the `web` directory.

### Publish
To publish the build files from the `web` directory to the web hosting server, use the command **`./sync-web.sh`**. This command requires SSH access to the web hosting platform.

