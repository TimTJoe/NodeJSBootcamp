let stopwatchSec = document.getElementById("stopwatchSec");
let stopwatchHour = document.getElementById("stopwatchHour");
let startStopwatchBtn = document.getElementById("startStopwatch");
let pauseStopwatchBtn = document.getElementById("pauseStopwatch");
let resetStopwatchBtn = document.getElementById("resetStopwatch");
pauseStopwatchBtn.style.display = "none";
resetStopwatchBtn.style.display = "none";
let stopwatchInterval;

let sec = 0;
let min = 0;
let hour = 0;

function resetStopwatch() {
  stopwatchHour.innerHTML = "00";
  stopwatchSec.innerHTML = "00";
  stopwatchMin.innerHTML = "00";
  clearInterval(stopwatchInterval);
  sec = 0;
  min = 0;
  hour = 0;
}
function pauseStopwatch(interval) {
  clearInterval(interval);
}

function formatNum(num) {
  return num < 10 ? "0" + num : num;
}

function startStopwatch() {
  ++sec;
  stopwatchSec.innerHTML = formatNum(sec);
  if (sec == 60) {
    ++min;
    stopwatchMin.innerHTML = formatNum(min);
    sec = 0;
    if (min == 60) {
      ++hour;
      stopwatchHour.innerHTML = formatNum(hour);
      min = 0;
    }
  }
}

startStopwatchBtn.addEventListener("click", (e) => {
  startStopwatchBtn.disabled = true;
  pauseStopwatchBtn.disabled = false;
  pauseStopwatchBtn.style.display = "inline-block";
  resetStopwatchBtn.style.display = "inline-block";

  stopwatchInterval = setInterval(() => {
    startStopwatch();
  }, 1000);
});
pauseStopwatchBtn.addEventListener("click", () => {
  startStopwatchBtn.disabled = false;
  resetStopwatchBtn.style.display = "inline-block";
  pauseStopwatch(stopwatchInterval);
});
resetStopwatchBtn.addEventListener("click", () => {
  startStopwatchBtn.disabled = false;
  pauseStopwatchBtn.style.display = "none";
  resetStopwatch();
});
