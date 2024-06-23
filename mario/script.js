document.getElementById("buildBtn").addEventListener("click", (e) => {
  const number = document.getElementById("numberInput").value;
  if (number < 1 || number > 8) {
    document.getElementById("errorMsg").innerText =
      "Number must be between 1 and 8";
  } else {
    build(number);
  }
});

function build(number) {
  const right = document.getElementById("rightSide");
  const left = document.getElementById("leftSide");
  const squard = "◼";

  for (let index = 0; index <= number; index++) {
    left.insertAdjacentHTML("beforeend", squard.repeat(index) + "<br/>");
    right.insertAdjacentHTML("beforeend", squard.repeat(index) + "<br/>");
  }
}
