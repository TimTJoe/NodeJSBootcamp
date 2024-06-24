const questionsURL = "./questions.json";
const htmlBtn = document.getElementById("htmlBtn");
const jsBtn = document.getElementById("jsBtn");
const cssBtn = document.getElementById("cssBtn");
const questionIndex = [
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q8",
  "q9",
  "q10",
];

htmlBtn.addEventListener("click", async (e) => {
  let data = await readJSONFile(questionsURL);
  data = data["html"][questionIndex[1]];
  console.log(data);
});

cssBtn.addEventListener("click", async (e) => {
  let data = await readJSONFile(questionsURL);
  data = data["css"];
  console.log(data);
});

jsBtn.addEventListener("click", async (e) => {
  let data = await readJSONFile(questionsURL);
  data = data["js"];

  console.log(data);
});

async function readJSONFile(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function displayQuestion(question) {
  console.log(question);
}

function getData(data, type, index) {
  return data[type][index];
}

function getRandomQuestion(data) {
  const questionIndex = [
    "q1",
    "q2",
    "q3",
    "q4",
    "q5",
    "q6",
    "q7",
    "q8",
    "q8",
    "q9",
    "q10",
  ];
}
