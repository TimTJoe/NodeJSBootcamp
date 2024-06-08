function displayTime() {
    let date = new Date().toLocaleDateString
    let time = new Date().toLocaleDateString()
    let second = new Date().toLocaleTimeString()

    document.getElementById("hrText").innerHTML = date;
    document.getElementById("minText").innerHTML = time;
}

let interval = setInterval(displayTime(), 100);
clearInterval(interval)
