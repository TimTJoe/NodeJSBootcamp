//refence select element from HTML
let pomodoroBtn = document.getElementById("pomodoroBtn");
let longBreakBtn = document.getElementById("longBreakBtn");
let shortBreakBtn = document.getElementById("shortBreakBtn");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let restartBtn = document.getElementById("restartBtn");
let timerText = document.getElementById("timerText");
let timerInterval;

let workDuration = 1; //alway 25
let breakDuration = 5; //dynamic
let seconds = 60; //always 60
let workMinutes = workDuration - 1; //work minutes will always be the duration - 1
let breakMinutes = breakDuration - 1; //comes after a work session, will aways be
let breakCount = 0; //dynamic but never cross two

function remainingTime() {
  //decrement the current second value
  seconds = seconds - 1;
  //check if second reach 1 min
  if (seconds === 0) {
    //decrement the current work minute and reasign
    workMinutes = workMinutes - 1;
    //check it workminutes is 0
    if (workMinutes === -1) {
      //check if break time is 1
      if (breakCount % 2 == 0) {
        //asigned the breakMinutes to workminutes
        //this will make the session be a break session
        workMinutes = breakMinutes;
        //increment the break session after a break session is complete
        breakCount++;
      } else {
        //decrement the work minutes by 1
        workMinutes = breakDuration - 1;
        //increment the breakcount to indicate
        //that a work session just completed
        breakCount++;
      }
    }
    //set second back to 60
    seconds = 60;
  }
  //add the work minutes and seconds to html
  timerText.innerHTML = workMinutes + " : " + seconds;
}

longBreakBtn.addEventListener("click", () => {
  breakMinutes = 15 - 1;
});
shortBreakBtn.addEventListener("click", () => {
  breakMinutes = 5 - 1;
});
pomodoroBtn.addEventListener("click", () => {
  workDuration = 25 - 1;
});

function startTimer() {
  console.log(workDuration);
  console.log(breakMinutes);
  timerInterval = setInterval(() => {
    remainingTime();
  }, 1000);
}

pauseBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
});

startBtn.addEventListener("click", () => {
  startTimer();
});

restartBtn.addEventListener("click", () => {
    timerText.innerHTML = "00:00";
    startTimer()
    clearInterval(timerInterval)
});
