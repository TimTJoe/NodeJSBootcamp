const {createServer} = require("http")

const server = createServer((request, response) => {
    console.log("REACHED")
    response.send("server is working...")
    response.end()
})

server.listen(3000, () => {
    console.log("server listenining on port 3000")
})