# Grand Prix Winterthur Teaser Page

Source code of the website https://gp-winterthur.ch/

## How to Use the CSS Classes

### General Structure:
- The HTML structure is divided into various sections like header, content blocks, and footer. Each section utilizes specific classes to handle its layout and styling.

### Class Definitions:
- **.teaser-image** and **.logo**: These classes are used in the website's header section to display prominent images and logos correctly across all devices.
- **.text-columns**, **.column-one**, and **.column-two**: These classes manage the layout of text content in a multi-column format, making it easier to read and visually appealing.
- **.text-wide**: Used for broader text sections to ensure they are engaging and well-padded.
- **.button-round**: Applies to buttons, giving them a rounded appearance and interactive feedback like color change on hover or click.

#### .text-columns
The .text-columns class is designed for layouts that benefit from a structured, multi-column format. This class is particularly useful when you want to display content in a side-by-side manner, which is ideal for comparing information, organizing different topics neatly, or when you want to present related content that doesn't necessarily flow directly from one paragraph to the next.

#### .text-wide
The .text-wide class is suited for broader sections of text or elements that require more horizontal space and a focal presence on the page. This class is typically used for key sections of content that need to stand out, such as important announcements, large images, or call-to-action buttons that you want to highlight prominently.

### Responsiveness:
- Media queries are utilized within the CSS to adjust styles according to the screen size. For example, the `.hide-on-mobile` class hides certain elements on smaller screens to maintain a clean and uncluttered mobile experience.
- Images like sponsor logos are set to adjust in size and arrangement based on the viewport width to ensure that they remain proportionate and visually balanced.

### Footer Section:
- The footer uses classes like `.footer-color-transition`, `.footer-box`, and `.footer-row` to organize content and sponsor information attractively and accessibly.
- Flexbox properties are heavily utilized to align and space elements dynamically based on screen size.

## SVG
- SVG images have been optimized using https://svgomg.net/