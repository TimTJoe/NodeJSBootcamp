let mark = "x";
let boxes = document.querySelectorAll(".box");
let winningOptions = ["123", "147", "159", "258", "369", "357", "456", "789"];
let computerMoves = 0;
let HumanMoves = 0;

boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    if (isHuman()) {
      playHuman(event);
      endGame();
    }
    if (isComputer()) {
      setTimeout(() => {
        playComputer();
        endGame();
      }, 2000);
    }
  });
});

function isEmpty(nodeId) {
  if (document.getElementById(nodeId).innerText === "") {
    return true;
  }
  return false;
}

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
  ++HumanMoves;
  switchTurn();
}

function playComputer() {
  for (const box in boxes) {
    let randomNum = Math.floor(Math.random() * 9);
    if (boxes[randomNum].innerText === "") {
      boxes[randomNum].innerText = "O";
      break;
    } else if (computerMoves == 4) {
      break;
    }
  }
  ++computerMoves;
  switchTurn();
}

function endGame() {
  if (HumanMoves === 5) {
    alert("human moves ends...");
  } else if (computerMoves == 4) {
    alert("computer move ends...");
  }
}