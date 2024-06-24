const questionsURL = "./questions.json";

window.addEventListener("DOMContentLoaded", (e) => {
  readJSONFile(questionsURL);
});

async function readJSONFile(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}
