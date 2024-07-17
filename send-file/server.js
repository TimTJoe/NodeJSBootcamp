const express = require("express")
const path = require("path")
const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

console.log(path.join(__dirname, "public"))

app.listen(3000)