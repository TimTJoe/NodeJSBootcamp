function displayTime() {
    let date = new Date()
    let content = document.getElementById("content")
    content.innerHTML = `
    <span>${date.toLocaleTimeString()}
    `;
    console.log("interval")
}

setInterval(displayTime, 100);
