let mainContentDiv = getElementById("mainContent");
let renderDecryptionFieldsBtn = getElementById("renderDecryptionFields");
let renderEncryptionFieldsBtn = getElementById("renderEncryptionFields");

let encryptionForm = `
        <fieldset>
        <input
          type="text"
          name="decryptionText"
          id="decryptionText"
          placeholder="Enter encrypted text"
        />
        <input
          type="number"
          name="decryptionKey"
          id="decryptionKey"
          placeholder="Enter encryption key"
        />
        <button id="decryptionBtn">Decrypt</button>

        <h3>Result: <span id="decryptionResult"></span></h3>
        <small id="decryptionError"></small>
      </fieldset>
  `;

let decryptionForm = `
        <fieldset>
        <input
          type="text"
          name="encryptionText"
          id="encryptionText"
          placeholder="Enter Text"
        />
        <input
          type="number"
          name="encryptionKey"
          id="encryptionKey"
          placeholder="Enter encryption key"
        />
        <button id="encryptionBtn">Encrypt</button>
        <h3>Result: <span id="encryptionResult">a span text</span></h3>
        <small id="encryptionError"></small>
      </fieldset>
  `;

window.onload = () => {
  mainContentDiv.innerHTML = encryptionForm;
  renderEncryptionFieldsBtn.classList.add("active");
  renderDecryptionFieldsBtn.classList.remove("active");
};

function encrypt(text, key) {
  let isKeyValid = validateKey(key);
  let encryptedText = "";
  if (!isKeyValid.status) {
    getElementById("encryptionError").innerHTML = isKeyValid.message;
  } else {
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === NaN) {
        console.log(typeof text.charAt(i));
      } else {
        console.log(typeof text.charAt(parseFloat(i)));
        let charCode = text.charCodeAt(i);
        charCode = parseInt(charCode) - parseInt(key);
        encryptedText += String.fromCharCode(charCode);
      }
    }
  }
  // getElementById("encryptionResult").innerHTML = encryptedText;
}
function decrypt(text, key) {
  let isKeyValid = validateKey(key);
  let decryptedText = "";
  if (!isKeyValid.status) {
    getElementById("decryptionError").innerHTML = isKeyValid.message;
  } else {
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      charCode = parseInt(charCode) + parseInt(key);
      decryptedText += String.fromCharCode(charCode);
    }
  }
  // getElementById("decryptionResult").innerHTML = decryptedText;
}

window.addEventListener("DOMContentLoaded", (e) => {});

function getValue(nodeId) {
  return document.getElementById(nodeId).value;
}

function getElementById(nodeId) {
  return document.getElementById(nodeId);
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

renderEncryptionFieldsBtn.addEventListener("click", (event) => {
  event.preventDefault();
  renderDecryptionFieldsBtn.classList.remove("active");
  renderEncryptionFieldsBtn.classList.add("active");
  mainContentDiv.innerHTML = encryptionForm;

  getElementById("encryptionBtn").addEventListener("click", () => {
    let encryptionText = getValue("encryptionText");
    let encryptionKey = getValue("encryptionKey");
    encrypt(encryptionText, encryptionKey);
  });
});

getElementById("renderDecryptionFields").addEventListener("click", (event) => {
  event.preventDefault();
  renderDecryptionFieldsBtn.classList.add("active");
  renderEncryptionFieldsBtn.classList.remove("active");
  mainContentDiv.innerHTML = decryptionForm;

  getElementById("decryptionBtn").addEventListener("click", () => {
    alert("dectypt")
    let decryptionText = getValue("decryptionText");
    let decryptionKey = getValue("decryptionKey");
    decrypt(decryptionText, decryptionKey);
  });
});
