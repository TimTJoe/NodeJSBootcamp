const api_key = "cSTiUMBsBwKkLjVjV9RCyQ==gSjxbqYa0JtWgUX9";
const api_url = "https://api.api-ninjas.com/v1/loremipsum?paragraphs=10";
const url = "./text.json";
// import paragraphs from "./text.json" assert { type: "json" };
let paragraph;
let interval;
let seconds = 60;

window.addEventListener("load", async () => {
  document.getElementById("reset").style.display = "none";
  paragraph = await genParagraph();
});

document.getElementById("textarea").addEventListener("input", () => {
  if (!interval) {
    interval = setInterval(() => {
      countDown();
    }, 1000);
  }
});

function countDown() {
  seconds = --seconds;
  if (seconds === 0) {
    document.getElementById("textarea").disabled = true;
    clearInterval(interval);
    document.getElementById("timer").innerText = 0;
    document.getElementById("reset").style.display = "block";
    let metrics = getTestMetrics(
      paragraph,
      document.getElementById("textarea").value
    );
    document.getElementById("wpm").innerText = metrics.wpm;
    document.getElementById("cpm").innerText = metrics.cpm;
    document.getElementById("errors").innerText = metrics.errors;
    document.getElementById("accuracy").innerText = metrics.accuracy;
    return;
  } else {
    document.getElementById("timer").innerText = seconds;
    return;
  }
}

async function genParagraph() {
  const response = await fetch(url);
  const paragraphs = await response.json();
  const randomIndex = Math.floor(Math.random() * paragraphs.texts.length);
  document.getElementById("paragraph").innerText =
    paragraphs.texts[randomIndex].text;
  return paragraphs.texts[randomIndex].text;
}

function countWrongWords(inputText, referenceText) {
  const referenceWords = referenceText.split(" ");
  const inputWords = inputText.split(" ");
  let wrongWordCount = 0;

  for (let i = 0; i < inputWords.length; i++) {
    if (inputWords[i] !== referenceWords[i]) {
      wrongWordCount++;
    }
  }
  document.getElementById("errors").innerText = `Errors: ${wrongWordCount}`;
  return wrongWordCount;
}

// Function to calculate characters per minute (CPM)
const calculateCPM = (text) => {
  const charactersTyped = text.length;
  const elapsedTimeMinutes = 1; // Fixed time for 1 minute
  return calculateRate(charactersTyped, elapsedTimeMinutes);
};

// Function to calculate words per minute (WPM)
const calculateWPM = (text) => {
  const wordsTyped = text.split(/\s+/).filter(Boolean).length;
  const elapsedTimeMinutes = 1; // Fixed time for 1 minute
  return calculateRate(wordsTyped, elapsedTimeMinutes);
};

// Helper function to calculate rate
const calculateRate = (count, elapsedTimeMinutes) => {
  return elapsedTimeMinutes > 0 ? Math.round(count / elapsedTimeMinutes) : 0;
};

// Function to check for errors
const countErrors = (referenceText, inputText) => {
  const referenceWords = referenceText.split(/\s+/);
  const inputWords = inputText.split(/\s+/);

  let errors = 0;
  for (let i = 0; i < inputWords.length; i++) {
    if (inputWords[i] !== referenceWords[i]) {
      errors++;
    }
  }
  return errors;
};

// Function to calculate accuracy
const calculateAccuracy = (referenceText, inputText) => {
  const totalWords = referenceText.split(/\s+/).length;
  const errors = countErrors(referenceText, inputText);
  const correctWords = totalWords - errors;

  return Math.trunc(((correctWords / totalWords) * 100).toFixed(2)) + "%"; // Return accuracy as a percentage
};

// Function to get metrics
const getTestMetrics = (referenceText, inputText) => {
  const cpm = calculateCPM(inputText);
  const wpm = calculateWPM(inputText);
  const charactersTyped = inputText.length;
  const accuracy = calculateAccuracy(referenceText, inputText);
  const errors = countErrors(referenceText, inputText);

  return { charactersTyped, cpm, wpm, accuracy, errors };
};

document.getElementById("reset").addEventListener("click", (e) => {
  window.location.reload();
});
