# Carder - Talk Example

This app actually has TWO versions/modes; if you have a copy of my dynamic loader plugin; install it and it will use it to dynamically swap in and out layouts which are located in the /app/cardviews folder.

The second mode basically has every single one of the card layouts embedded in the main-page.xml layout and just hides/unhides the layout as needed.   This version is slower, as it has to build every single layout and keep all layouts in memory at all times..

## Tests

/app/tests - contains the NativeScript Unit tests

/e2e-tests - contains the Appium tests

