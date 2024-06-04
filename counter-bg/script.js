window.addEventListener("DOMContentLoaded", () => {
  let counter = 0;
  let colors = [
    "red",
    "blue",
    "yellow",
    "green",
    "purple",
    "gray",
    "black",
    "orange",
    "brown",
    "gold",
    "cream",
  ];
  let increaseBtn = document.getElementById("increaseBtn");
  let decreaseBtn = document.getElementById("decreaseBtn");
  let body = document.getElementById("body");
  let numElem = document.getElementById("number");

  increaseBtn.addEventListener("click", () => {
    counter == 10 ? (counter = 0) : counter++;
    body.style.backgroundColor = colors[counter];
    numElem.innerHTML = counter;
  });
  decreaseBtn.addEventListener("click", () => {
    counter == 0 ? (counter = 0) : counter--;

    body.style.backgroundColor = colors[counter];
    numElem.innerHTML = counter;
  });
});
