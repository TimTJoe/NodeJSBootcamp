document
  .getElementById("buildBtn")
  .addEventListener("click", handleBuildButtonClick);

/**
 * Handles the click event for the build button.
 * Clears previous content, validates the input, and triggers the build process.
 * @param {Event} e - The click event.
 */
function handleBuildButtonClick(e) {
  clearPreviousContent();
  const number = parseInt(document.getElementById("numberInput").value, 10);

  if (isValidNumber(number)) {
    build(number);
  } else {
    displayErrorMessage("Number must be between 1 and 8");
  }
}

/**
 * Clears previous content from the right and left sides and the error message.
 */
function clearPreviousContent() {
  document.getElementById("rightSide").innerHTML = "";
  document.getElementById("leftSide").innerHTML = "";
  document.getElementById("errorMsg").innerHTML = "";
}

/**
 * Validates if the provided number is between 1 and 8.
 * @param {number} number - The number to validate.
 * @returns {boolean} - True if the number is valid, false otherwise.
 */
function isValidNumber(number) {
  return number >= 1 && number <= 8;
}

/**
 * Displays an error message.
 * @param {string} message - The error message to display.
 */
function displayErrorMessage(message) {
  document.getElementById("errorMsg").innerText = message;
}

/**
 * Builds the left and right side blocks with squares.
 * @param {number} number - The number of lines to build.
 */
function build(number) {
  const left = document.getElementById("leftSide");
  const right = document.getElementById("rightSide");
  const square = "◼";

  for (let i = 1; i <= number; i++) {
    setTimeout(() => appendSquares(left, i, square), i * 500);
    setTimeout(() => appendSquares(right, i, square), i * 550);
  }
}

/**
 * Appends squares to the given element.
 * @param {HTMLElement} element - The element to append squares to.
 * @param {number} count - The number of squares to append.
 * @param {string} square - The square character to append.
 */
function appendSquares(element, count, square) {
  element.insertAdjacentHTML("beforeend", `${square.repeat(count)}<br/>`);
}
