const questionsURL = "./questions.json";
const htmlBtn = document.getElementById("htmlBtn");
const jsBtn = document.getElementById("jsBtn");
const cssBtn = document.getElementById("cssBtn");

window.addEventListener("DOMContentLoaded", (e) => {});

htmlBtn.addEventListener("click", async (e) => {
  let data = await readJSONFile(questionsURL);
  console.log(data);
});

async function readJSONFile(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
