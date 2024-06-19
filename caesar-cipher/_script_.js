// function encrypt(text, key) {
//   let isKeyValid = validateKey(key);
//   let encryptedText = "";
//   if (!isKeyValid.status) {
//     errorSmall.innerHTML = isKeyValid.message;
//   } else {
//     for (let i = 0; i < text.length; i++) {
//       if (text.charAt(i) === NaN) {
//       } else {
//         let charCode = text.charCodeAt(i);
//         charCode = parseInt(charCode) - parseInt(key);
//         encryptedText += String.fromCharCode(charCode);
//       }
//     }
//   }
//   // resultText.innerHTML = encryptedText;
//   typeWriter(encryptedText);
// }

// function decrypt(text, key) {
//   let isKeyValid = validateKey(key);
//   let decryptedText = "";
//   if (!isKeyValid.status) {
//     errorSmall.innerHTML = isKeyValid.message;
//   } else {
//     for (let i = 0; i < text.length; i++) {
//       let charCode = text.charCodeAt(i);
//       charCode = parseInt(charCode) + parseInt(key);
//       decryptedText += String.fromCharCode(charCode);
//     }
//   }
//   resultText.innerHTML = decryptedText;
//   typeWriter(decryptedText);
// }


// function typeWriter(text, speed = 50) {
//   let i = 0;

//   function type() {
//     if (i < text.length) {
//       document.getElementById("resultText").innerHTML += text.charAt(i);
//       i++;
//       setTimeout(type, speed);
//     }
//   }
// }


const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const resultText = document.getElementById("resultText");
const submitBtn = document.getElementById("submitBtn");
const errorSmall = document.getElementById("errorSmall");

submitBtn.addEventListener("click", () => {
  let key = getValue("key");
  let text = getValue("text");
  processText(text, key);
});

encryptBtn.addEventListener("click", (event) => {
  setState("encrypt");
  moveClass("active", "decryptBtn", "encryptBtn");
  clearInputs();
  submitBtn.innerHTML = "Encrypt";
});

decryptBtn.addEventListener("click", (event) => {
  setState("decrypt");
  moveClass("active", "encryptBtn", "decryptBtn");
  clearInputs();
  submitBtn.innerHTML = "Decrypt";
});

window.onload = () => {
  setState("encrypt");
  submitBtn.innerHTML = getState();
  if (getState() == "encrypt") {
    moveClass("active", "decryptBtn", "encryptBtn");
  } else if (getState() == "decrypt") {
    moveClass("active", "encryptBtn", "decryptBtn");
  }
};

function getValue(nodeId) {
  return document.getElementById(nodeId).value;
}

function validateKey(key) {
  if (key?.constructor == "string") {
    return { status: false, message: "Key must be number" };
  } else if (key < 1 || key > 25) {
    return { status: false, message: "Key must be between 1 and 25" };
  } else {
    return { status: true, message: null };
  }
}

function setState(value) {
  window.history.pushState({ type: value }, { name: null });
}

function getState() {
  return window.history.state.type || null;
}

function moveClass(className, from, to) {
  document.getElementById(from).classList.remove(className);
  document.getElementById(to).classList.add(className);
}

function clearInputs() {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
  resultText.innerHTML = "";
  errorSmall.innerHTML = "";
}

function processText(text, key) {
  // Validate the key to ensure it's a number
  const isKeyValid = validateKey(key);
  if (!isKeyValid.status) {
    // Display error message if key is invalid
    errorSmall.innerHTML = isKeyValid.message;
    return;
  }

  // Convert key to integer
  const keyInt = parseInt(key);
  // Determine the operation type from history state ('encrypt' or 'decrypt')
  const operation = getState();
  // Initialize an empty string to store the processed text
  let processedText = "";

  // Function to process each character in the text
  const processChar = (charCode) => {
    if (charCode >= 65 && charCode <= 90) {
      // Uppercase A-Z
      let newCharCode =
        operation === "encrypt" ? charCode - keyInt : charCode + keyInt;
      // Wrap around if newCharCode goes outside 'A'-'Z' range
      if (newCharCode < 65) newCharCode += 26; // Wrap around to 'Z' -> 'A'
      if (newCharCode > 90) newCharCode -= 26; // Wrap around to 'A' -> 'Z'
      return String.fromCharCode(newCharCode);
    } else if (charCode >= 97 && charCode <= 122) {
      // Lowercase a-z
      let newCharCode =
        operation === "encrypt" ? charCode - keyInt : charCode + keyInt;
      // Wrap around if newCharCode goes outside 'a'-'z' range
      if (newCharCode < 97) newCharCode += 26; // Wrap around to 'z' -> 'a'
      if (newCharCode > 122) newCharCode -= 26; // Wrap around to 'a' -> 'z'
      return String.fromCharCode(newCharCode);
    } else {
      // Return unchanged for non-alphabetic characters (numbers, spaces, special characters)
      return String.fromCharCode(charCode);
    }
  };

  // Loop through each character in the input text
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    // Process each character and append the result to processedText
    processedText += processChar(charCode);
  }

  // Display the processed text with typewriter effect
  displayResult(processedText);
}

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
