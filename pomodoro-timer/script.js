let timerText = document.getElementById("timerText");

let snackbar = document.getElementById("snackbar");
let snackbarMsg = document.getElementById("snackbarMsg");
let snackbarBtn = document.getElementById("snackbarBtn");

let startBreakBtn = document.getElementById("startBreakBtn");
let startSessionBtn = document.getElementById("startSessionBtn");

let seconds = 5;
let workMinutes = 3;
let breakMinutes = 5;
let breakCount = 0;
let timerInterval;

function startTimer() {
  seconds = --seconds;
  if (seconds === 0) {
    workMinutes = --workMinutes;
    if (workMinutes === 0) {
      workMinutes = breakMinutes - 1;
      if (breakCount % 2 === 0) {
        workMinutes = workMinutes - 1;
        breakCount++;
      } else {
        workMinutes = --workMinutes;
        breakCount++;
      }
    }
    seconds = 5;
  }
  timerText.innerHTML =
    String(workMinutes).padStart(2, "0") +
    " : " +
    String(seconds).padStart(2, "0");
  pauseBtn.disabled = false;
}
function pauseTimer() {
  startSessionBtn.disabled = true;
  pauseBtn.disabled = true;
  restartBtn.disabled = false;
  clearInterval(timerInterval);
}
function restartTimer() {
  clearInterval(timerInterval);
  workMinutes = getBreakMinutes();
  seconds = 60 - 1;
  timerText.innerHTML =
    String(workMinutes).padStart(2, "0") +
    " : " +
    String(seconds).padStart(2, "0");
  startSessionBtn.disabled = false;
  pauseBtn.disabled = true;
  restartBtn.disabled = true;
  timerInterval = setInterval(() => {
    startTimer();
  }, 1000);
}

function getBreakMinutes() {
  let breakTimeList = document.getElementById("breakTimeList");
  return breakTimeList.options[breakTimeList.selectedIndex].value;
}

startSessionBtn.addEventListener("click", () => {
  startSessionBtn.disabled = true;
  timerInterval = setInterval(() => {
    startTimer();
  }, 1000);
});

pauseBtn.addEventListener("click", () => {
  pauseTimer();
});

restartBtn.addEventListener("click", () => {
  restartTimer();
});
