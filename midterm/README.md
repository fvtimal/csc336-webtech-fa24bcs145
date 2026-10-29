# Lab Mid Term - Web Technologies

Name: Fatima Azhar
Roll number: FA24-BCS-145
N = 45
BP = 645px
H = 315 (accent colour: hsl(315, 70%, 45%))
K = 3

Exam date used for Task 2: 29 October 2026. Latest delivery date: 13 December 2026 (exam date + N days).
Limit per product in Task 3: (N mod 4) + 2 = (45 mod 4) + 2 = 3.

## Files changed
- index.html (new navbar items, cart badge/mini-cart markup, script link, grid class col-sm-6)
- product.html (new navbar items, cart badge/mini-cart markup, script link)
- style.css (mega-menu, checkout form, mini-cart styles, navbar breakpoint)
- checkout.html (new file)
- script.js (new file)

## Task 1 - Mega-menu
I removed Bootstrap's navbar-expand-md class and made the navbar collapse at 645px
in my own CSS. I added a "Shop by Category" item with 3 columns (K = 3), each with a
heading and 4 links in a list. It opens on hover or keyboard focus using
:hover and :focus-within, with no JavaScript. The panel is position:absolute with
z-index 1100, so it sits above the product grid and does not push the page down.
Below 645px the same 3 groups are shown as a <details>/<summary> accordion inside the
hamburger menu, closed by default, each opening independently.

## Task 2 - Checkout form
checkout.html is linked from the cart. It has two fieldsets (Contact and Delivery)
and every input has a label joined with for/id. The phone input uses
pattern="03[0-9]{2}-[0-9]{7}". The delivery date uses min="2026-10-29" and
max="2026-12-13". Errors (red border and message) show only after interaction using
:user-invalid. From 645px the fieldsets sit side by side and labels are in a left
column using CSS Grid; below 645px it is one column with labels above the inputs.
The submit button is full width at every size.

## Task 3 - Cart badge and mini cart
script.js keeps the cart in an array of {name, price} objects. The name and price are
read from the product card itself. Add to Cart increases the badge. The cart icon
opens or closes a mini-cart panel that lists each item with a Remove button, and the
total is calculated with reduce(). Each product can be added at most 3 times, after
which its button says "Limit reached" and is disabled until one is removed. The cart
is saved in localStorage so the product page and listing page share it, and the
product page Add to Cart button also works.

## AI tools used
Claude