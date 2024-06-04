window.addEventListener("DOMContentLoaded", () => {
  let randomNum = Math.floor(Math.random() * 101);
  let guessBtn = document.getElementById("guessBtn");
  let attemptSpan = document.getElementById("attemptSpan");
  let message = document.getElementById("message");
  let answer = document.getElementById("answer");
  let guessNum;
  let flag = 1;
  let chances = 5;

  guessBtn.addEventListener("click", () => {
    guessNum = window.prompt("What is the number am thinking?");
    answer.innerHTML = null;

    if (guessNum == randomNum) {
      message.classList.remove("error");
      message.classList.add("success");
      message.innerHTML = `Hurray!! You won. You got it in ${flag} attempts`;
      attemptSpan.innerHTML = parseFloat(chances);
      chances = 5;
      guessBtn.classList.remove("restart");
    } else if (chances === 1) {
      message.innerHTML = "Opps! Chances exhausted. You lose.";
      chances = 5;
      attemptSpan.innerHTML = 0;
      guessBtn.innerHTML = "Try Again";
      guessBtn.classList.add("restart");
      answer.innerHTML = `The answer is ${randomNum}`;
      guessBtn.addEventListener("click", () => {
        guessBtn.classList.remove("restart");
        guessBtn.innerHTML = "Guess";
      });
    } else if (guessNum > randomNum) {
      ++flag;
      --chances;
      message.innerHTML = `Oh! you missed. ${guessNum} is too high`;
      attemptSpan.innerHTML = parseFloat(chances);
      message.classList.add("error");
    } else if (guessNum < randomNum) {
      ++flag;
      --chances;
      message.innerHTML = `Oh! you missed. ${guessNum} is too low`;
      attemptSpan.innerHTML = parseFloat(chances);
      message.classList.add("error");
    }
  });
});
