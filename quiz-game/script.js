import { getState, setState } from "../modules.js";

const questionsURL = "./questions.json";

window.onload = () => {
  document.querySelectorAll(".categoryBtn").forEach((button) => {
    button.value == getState() ? button.classList.add("active") : null;
  });
};

async function readJSONFile(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function getRandomQuestions(type, num) {
  setState(type);
}

function displayQuestions(question) {
  console.log(question);
}

document.querySelectorAll(".categoryBtn").forEach((button) => {
  button.addEventListener("click", (e) => {
    setState(button.value);
    let state = getState() || null;
    document
      .querySelectorAll(".categoryBtn")
      .forEach((btn) => btn.classList.remove("active"));
    button.value == state ? button.classList.add("active") : null;
  });
});
