window.addEventListener("DOMContentLoaded", () => {
  let xElem = document.getElementById("x");
  let yElem = document.getElementById("y");

  let iteration = 0;
  let colors = ["red", "blue", "yellow", "green", "purple", "gray", "black", "orange", "brown", "Gold"];

  xElem.addEventListener("animationiteration", (e) => {
    iteration == 9 ? (iteration = 0) : iteration++;
    yElem.style.backgroundColor = colors[iteration];
  });
    
  yElem.addEventListener("animationiteration", (e) => {
    iteration == 9 ? (iteration = 0) : iteration++;
    yElem.style.backgroundColor = colors[iteration];
  });
});
