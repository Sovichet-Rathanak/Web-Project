// Select the color picker element and the outerbox element
const boardColorPicker = document.getElementById('TCP');
const outerbox = document.querySelector('.outerbox');

// Add an event listener to the color picker input
boardColorPicker.addEventListener('input', () => {
    // Change the background color of the outerbox based on the selected color
    outerbox.style.backgroundColor = boardColorPicker.value;
});

//Getting user input from text field
document.addEventListener('DOMContentLoaded', (event) => {
    const userInput = document.getElementById("Input");
    const ledText = document.getElementById("led-text");

    // Event listener for input field
    userInput.addEventListener('input', () => {
        ledText.textContent = userInput.value;
    });
});