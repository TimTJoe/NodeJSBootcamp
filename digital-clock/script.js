function displayTime() {
  let date = new Date();
  let _date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  var meridiem = hour >= 12 ? "PM" : "AM";

  document.getElementById("hr").innerHTML = hour;
  document.getElementById("min").innerHTML = min;
  document.getElementById("sec").innerHTML = sec;
  document.getElementById("meridiem").innerHTML = meridiem;
  document.getElementById("date").innerHTML = _date;
}

setInterval(displayTime, 100);
