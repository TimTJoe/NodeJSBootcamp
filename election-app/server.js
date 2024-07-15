const express = require("express");
const path = require ("path")
const bodyparser =require("body-parser")
const app = express();
const port= 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static((path.join(__dirname, "public"))))
app.set("view engine", "ejs")
let users = []

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./test.db')

db.serialize(() => {

  const stmt = db.prepare('INSERT INTO auth VALUES ("", "joe", "12345678")')

  stmt.finalize()

  db.each('SELECT * from auth', (err, row) => {
    console.log(row)
  })

})


db.close()

app.get("/dashboard", (req,res)=>{
    res.render("dashboard.ejs")
})

app.get("/", (req,res)=>{
    res.render("index.ejs")
})

app.get("/login", (req,res)=>{
    res.render("login.ejs")
})

app.post("/login", (req,res)=>{   

    const {username, password} = req.body
   
    const user = users.find((user) => user.username == username && user.password == password);

    if(user){
        res.redirect("/dashboard")
    } else {
        res.json({user, login: req.body})
    }

});

app.get("/signup", (req,res)=>{
    res.render("signup.ejs")
})

app.post("/signup",(req,res)=>{
    const userData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }; 

    users.push(userData);
    console.log(`User SignUp:`, userData)
    res.redirect("/login")
})
 

app.listen(port,()=>{
    console.log(`App is listening to port ${port}`)
})