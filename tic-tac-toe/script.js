let mark = "x";
let boxes = document.querySelectorAll(".box");
let winningOptions = ["123", "147", "159", "258", "369", "357", "456", "789"];
let computerMoves = 0;
let humanMoves = 0;
let humanChoices = [];
let computerChoices = [];
const db = window.localStorage;
let overlay = document.getElementById("overlay");
let overlayMsg = document.getElementById("overlay-msg");
let replayBtn = document.getElementById("replay-btn");
let audioTag = document.getElementById("audio");
let audioSrc = [
  "./assets/audio/click.wav",
  "./assets/audio/error.wav",
  "./assets/audio/game_end.mp3",
];
let isGameOn = true;

window.onload = () => {
  displayResult();
};

boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    if (isHuman()) {
      playHuman(event);
      playSound("Human");
    }
    if (isComputer()) {
      setTimeout(() => {
        playComputer();
        playSound("Computer");
      }, 2000);
    }
    checkDraw(humanMoves, computerMoves);
  });
});

function switchTurn() {
  let turnText = document.getElementById("turn-text");
  turnText.innerText = turnText.innerText == "Computer" ? "Human" : "Computer";
}

function isHuman() {
  if (document.getElementById("turn-text").innerText == "Human") {
    return true;
  } else {
    return false;
  }
}

function isComputer() {
  if (document.getElementById("turn-text").innerText == "Computer") {
    return true;
  } else {
    return false;
  }
}

function playHuman(node) {
  node.target.innerText = "X";
  node.target.classList.add("orange")
  humanChoices.push(node.target.id);
  checkGameStatus(humanChoices);
  humanMoves++;
  switchTurn();
}

function playComputer() {
  for (const box in boxes) {
    let randomNum = Math.floor(Math.random() * 9);
    if (boxes[randomNum].innerText === "") {
      boxes[randomNum].innerText = "O";
      computerChoices.push(boxes[randomNum].id);
      checkGameStatus(computerChoices);
      break;
    } else if (computerMoves === 4) {
      break;
    }
  }
  computerMoves++;
  switchTurn();
}

function checkWin(playerChoices) {
  const indexesToCheck = [
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
  ];

  for (const indexes of indexesToCheck) {
    if (indexes.every((index) => index < playerChoices.length)) {
      const option = indexes
        .map((index) => playerChoices[index])
        .sort()
        .join("");
      if (winningOptions.includes(option)) {
        return true;
      }
    }
  }

  return false;
}
// Call this function after each move to check for a win
function checkGameStatus() {
  const humanWon = checkWin(humanChoices);
  const computerWon = checkWin(computerChoices);

  if (humanWon) {
    updateResult("human");
    endGame("Human win!");
  } else if (computerWon) {
    updateResult("computer");
    endGame("Computer win!");
  } else {
    console.log("No winner yet!");
  }
}

function checkDraw(humanMoves, computerMoves) {
  const totalMoves = humanMoves + computerMoves;
  const maxMoves = 9; // Total number of cells in a Tic Tac Toe board

  if (totalMoves >= maxMoves) {
    const humanWon = checkWin(humanChoices);
    const computerWon = checkWin(computerChoices);

    // If neither player has won, it's a draw
    if (!humanWon && !computerWon) {
      updateResult("draw");
      endGame("Game draw!");
      console.log("Game draw!");
      return true;
    } else {
      return false;
    }
  }
}

function updateResult(winner) {
  let wins = db.getItem(winner);
  if (wins !== null) {
    wins = Math.trunc(wins);
    db.setItem(winner, ++wins);
  } else {
    db.setItem(winner, 1);
  }
  displayResult();
}

function displayResult() {
  const humanScores = db.getItem("human");
  const drawScores = db.getItem("draw");
  const computerScores = db.getItem("computer");
  document.getElementById("human-score").innerHTML = `${
    humanScores || 0
  }`;
  document.getElementById("computer-score").innerHTML = `${
    computerScores || 0
  }`;
  document.getElementById("draw-score").innerHTML = `${drawScores || 0}`;
}

function endGame(message) {
  overlay.classList.remove("hidden");
  overlay.classList.add("visible");
  overlayMsg.innerHTML = message;
  audioTag.src = audioSrc[2];
  setTimeout(() => {
    audioTag.play();
    isGameOn = true;
  }, 1000);
}

function replayGame() {
  computerMoves = 0;
  humanMoves = 0;
  humanChoices = [];
  computerChoices = [];

  overlay.classList.remove("visible");
  overlay.classList.add("hidden");

  boxes.forEach((box) => {
    box.innerText = ""
    box.classList.remove("orange")
  });
}

replayBtn.addEventListener("click", () => {
  replayGame();
});

function playSound(player) {
  if (player == "Computer") {
    audioTag.src = audioSrc[0];
    audioTag.play();
  } else if (player == "Human") {
    audioTag.src = audioSrc[1];
    audioTag.play();
  } else if (player == "End") {
    audioTag.src = audioSrc[2];
    audioTag.play();
  }
}
