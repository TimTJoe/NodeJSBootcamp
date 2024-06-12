function displayTime() {
  let curDate = new Date();
  let formatedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  document.getElementById("date").innerHTML = formatedDate;
  document.getElementById("time").innerHTML = curDate.toLocaleTimeString();
}

setInterval(displayTime, 100);
