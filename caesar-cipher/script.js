/**
 * Gets the value of an input element by ID.
 * @param {string} nodeId - The ID of the input element.
 * @returns {string} The value of the input element.
 */
function getValue(nodeId) {
  return document.getElementById(nodeId).value;
}

/**
 * Validates if the provided key is a number between 1 and 25.
 * @param {string} key - The key to validate.
 * @returns {object} An object containing the status and an optional error message.
 */
function validateKey(key) {
  if (isNaN(key) || key < 1 || key > 25) {
    return { status: false, message: "Key must be a number between 1 and 25" };
  } else {
    return { status: true, message: null };
  }
}

/**
 * Sets the history state with a specified value.
 * @param {string} value - The value to set in history state.
 */
function setState(value) {
  window.history.pushState({ type: value }, null);
}

/**
 * Retrieves the current state from the history object.
 * @returns {string|null} The current state type or null if none set.
 */
function getState() {
  return window.history.state?.type || null;
}

/**
 * Moves a specified class from one element to another.
 * @param {string} className - The class to move.
 * @param {string} from - The ID of the element to remove the class from.
 * @param {string} to - The ID of the element to add the class to.
 */
function moveClass(className, from, to) {
  document.getElementById(from).classList.remove(className);
  document.getElementById(to).classList.add(className);
}

/**
 * Clears input fields, result text, and error messages.
 */
function clearInputs() {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
  document.getElementById("resultText").innerHTML = "";
  document.getElementById("errorSmall").innerHTML = "";
}

/**
 * Processes the input text based on the selected operation (encrypt/decrypt).
 * @param {string} text - The text to process.
 * @param {string} key - The encryption/decryption key.
 */
function processText(text, key) {
  const isKeyValid = validateKey(key);
  if (!isKeyValid.status) {
    document.getElementById("errorSmall").innerHTML = isKeyValid.message;
    return;
  }

  const keyInt = parseInt(key);
  const operation = getState();
  let processedText = "";

const processChar = (charCode) => {
  if (charCode >= 48 && charCode <= 57) {
    return String.fromCharCode(charCode);
  } else if (charCode === 32) {
    return String.fromCharCode(charCode); 
  } else if (charCode >= 65 && charCode <= 90) {
    let newCharCode =
      operation === "encrypt" ? charCode - keyInt : charCode + keyInt;
    if (newCharCode < 65) newCharCode += 26;
    if (newCharCode > 90) newCharCode -= 26;
    return String.fromCharCode(newCharCode);
  } else if (charCode >= 97 && charCode <= 122) {
    // a-z
    let newCharCode =
      operation === "encrypt" ? charCode - keyInt : charCode + keyInt;
    if (newCharCode < 97) newCharCode += 26;
    if (newCharCode > 122) newCharCode -= 26;
    return String.fromCharCode(newCharCode);
  } else {
    return String.fromCharCode(
      operation === "encrypt" ? charCode - keyInt : charCode + keyInt
    );
  }
};

  for (let i = 0; i < text.length; i++) {
    processedText += processChar(text.charCodeAt(i));
  }

  displayResult(processedText);
}

/**
 * Displays the result text with typewriter effect.
 * @param {string} text - The text to display.
 */
function displayResult(text) {
  const element = document.getElementById("resultText");
  element.innerHTML = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 50);
    }
  }

  type();
}

// Event listeners
document.getElementById("submitBtn").addEventListener("click", () => {
  const key = getValue("key");
  const text = getValue("text");
  processText(text, key);
});

document.getElementById("encryptBtn").addEventListener("click", () => {
  setState("encrypt");
  moveClass("active", "decryptBtn", "encryptBtn");
  clearInputs();
  document.getElementById("submitBtn").innerHTML = "Encrypt";
});

document.getElementById("decryptBtn").addEventListener("click", () => {
  setState("decrypt");
  moveClass("active", "encryptBtn", "decryptBtn");
  clearInputs();
  document.getElementById("submitBtn").innerHTML = "Decrypt";
});

window.onload = () => {
  setState("encrypt");
  document.getElementById("submitBtn").innerHTML = getState();
  if (getState() === "encrypt") {
    moveClass("active", "decryptBtn", "encryptBtn");
  } else if (getState() === "decrypt") {
    moveClass("active", "encryptBtn", "decryptBtn");
  }
};
