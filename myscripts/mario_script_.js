document.getElementById("buildBtn").addEventListener("click", (e) => {
  document.getElementById("rightSide").innerHTML = "";
  document.getElementById("leftSide").innerHTML = "";
  document.getElementById("errorMsg").innerHTML = "";

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
    setTimeout(() => {
      left.insertAdjacentHTML("beforeend", squard.repeat(index) + "<br/>");
    }, 500);
    setTimeout(() => {
      right.insertAdjacentHTML("beforeend", squard.repeat(index) + "<br/>");
    }, 1000);
  }
}
