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
  getElementById("encryptionResult").innerHTML = encryptedText;
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
  getElementById("decryptionResult").innerHTML = decryptedText;
}

getElementById("encryptionBtn").addEventListener("click", () => {
  let encryptionText = getValue("encryptionText");
  let encryptionKey = getValue("encryptionKey");
  encrypt(encryptionText, encryptionKey);
});

getElementById("decryptionBtn").addEventListener("click", () => {
  let decryptionText = getValue("decryptionText");
  let decryptionKey = getValue("decryptionKey");
  decrypt(decryptionText, decryptionKey);
});

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
