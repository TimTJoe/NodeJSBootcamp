let mark = "x";
let boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    switchTurn();
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
