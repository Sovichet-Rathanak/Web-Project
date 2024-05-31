// Fetch the CSS file for the specified theme
function setTheme(_theme) {
  const theme = _theme.toLowerCase();
  fetch(`themes/${theme}.css`) // Fetch the CSS file for the specified theme
    .then((response) => {
      if (response.status === 200) {
        // If the CSS file is found
        response.text().then((css) => {
          setCookie("theme", theme, 90); // Save the selected theme in a cookie
          document
            .querySelector("#theme")
            .setAttribute("href", `themes/${theme}.css`); // Apply the theme by setting the href attribute of the <link> tag
          setText(); // Update text if needed (assuming this function is defined elsewhere)
        });
        // .catch(err => console.error(err));
      } else {
        // console.log(`theme ${theme} is undefine`);  // Log an error if the theme is not found
      }
    });
  // .catch(err => console.error(err));  // Log any fetch errors
}

function setCookie(cname, cvalue, exdays) {
  //cname: Represents the name of the cookie. // cvalue: Represents the value to be stored in the cookie. // exdays: Represents the number of days until the cookie expires.
  var d = new Date(); // Variable Declaration
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000); // Setting Expiration Time
  var expires = "expires=" + d.toUTCString(); // Formatting Expiration Time
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; // Setting Cookie
}

showAllThemes(); // Function Declaration
function showAllThemes() {
  fetch(`themes/theme-list.json`) // Fetching Theme Data:
    .then((response) => {
      if (response.status === 200) {
        // If the file is found
        response
          .text()
          .then((body) => {
            let themes = JSON.parse(body); // Parse the JSON data to change css body theme
            let keys = Object.keys(themes); // Get the list of theme names
            let i;
            for (i = 0; i < keys.length; i++) {
              // Use mouse for onClick handler to apply the theme
              let theme = document.createElement("div"); // Create a new div for each theme
              theme.setAttribute("class", "theme-button");
              theme.setAttribute("onClick", `setTheme('${keys[i]}')`); // Set an onClick handler to apply the theme
              theme.setAttribute("id", keys[i]);

              // for tab enter on themes
              theme.setAttribute("tabindex", i + 5); // Set tabindex for accessibility
              theme.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                  // Allow theme selection with Enter key
                  setTheme(theme.id);
                  inputField.focus();
                }
              });

              if (themes[keys[i]]["customHTML"] != undefined) {
                theme.style.background = themes[keys[i]]["background"]; // Set background color
                theme.innerHTML = themes[keys[i]]["customHTML"]; // Set custom HTML if defined
              } else {
                theme.textContent = keys[i]; // Set the theme name
                theme.style.background = themes[keys[i]]["background"]; // Set background color
                theme.style.color = themes[keys[i]]["color"]; // Set text color
              }
              document.getElementById("theme-area").appendChild(theme); // Add the theme button to the page
            }
          })
          .catch((err) => console.error(err)); // Log any errors
      } else {
        console.log(`Cant find theme-list.json`); // Log an error if the JSON file is not found
      }
    })
    .catch((err) => console.error(err)); // Log any fetch errors
}

function showThemeCenter() {
  document.getElementById("theme-center").classList.remove("hidden"); // Show the theme center
  document.getElementById("command-center").classList.add("hidden"); // Hide the command center
}

function hideThemeCenter() {
  document.getElementById("theme-center").classList.add("hidden"); // Hide the theme center
  document.getElementById("command-center").classList.remove("hidden"); // Show the command center
}
