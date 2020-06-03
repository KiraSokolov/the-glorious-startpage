var searchBox = document.getElementById("searchBox");

let keysPressed = {};

document.addEventListener(
    'keydown', 
    (event) => {
        keysPressed[event.key] = true;

        // Open dashboard
        if (keysPressed['Alt'] && event.key === 's') {
            slideDashboard();
            return;
        } else if (keysPressed['Alt'] && event.key === 'w') {
            weatherToggle();
            return;
        }

        if (event.key === 'Escape') {

            event.preventDefault();
            
            // If searchbox is visible, hide and clear input field
            if (searchBoxVisible) {
                // Hide searchbox
                toggleSearchBox();
                searchBox.value = '';
                return;
            };

            // If dashboard is visible, hide
            if (floatPanelVisible) {
                slideDashboard();
                return;
            }

            // Show web menu
            webMenuToggle();
            return;
        }

        if (searchBoxVisible === false) {

            // Don't show searchbox when web menu is open
            if (webMenuVisible) {
                return;
            }

            // Dont accept ctrl, alt,
            // left window key, f5, f12, return
            if (event.key === 'Control' ||
                event.key === 'Alt' ||
                event.key === 'Meta' ||
                event.key === 'F5' ||
                event.key === 'F12' ||
                event.key === 'Enter')
                { return; };


            // Check if float panel is open, return
            if (floatPanelVisible) { return; };

            // Open searchbox
            toggleSearchBox();

        } else {
            
            // Backspacing while there's no search query will hide searhbox
            // Will also hide if you hit enter
            if ((event.key === 'Backspace' || event.key === 'Enter') && 
                searchBox.value < 1) { toggleSearchBox(); return; };

            // Clear searchbox
            if (event.key === 'Shift' && event.keyCode === 32 ) { 
                searchBox.value = '';
                return; 
            };
        }


});

document.addEventListener('keyup', (event) => {
   delete keysPressed[event.key];
});