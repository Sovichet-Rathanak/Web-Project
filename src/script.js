// Select the color picker element and the outerbox element
const boardColorPicker = document.getElementById('TCP');
const outerbox = document.querySelector('.outerbox');

// Add an event listener to the color picker input
boardColorPicker.addEventListener('input', () => {
    // Change the background color of the outerbox based on the selected color
    outerbox.style.backgroundColor = boardColorPicker.value;
});