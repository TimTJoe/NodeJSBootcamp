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
const db = new sqlite3.Database('./elections.db')

db.serialize(() => {

    db.run('CREATE TABLE IF NOT EXISTS auth (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) NOT NUll, password VARCHAR(50) NOT NULL, user_id INT)')
    db.run('CREATE TABLE IF NOT EXISTS  roles (id INT AUTO_INCREMENT PRIMARY KEY, role VARCHAR(50) NOT NUll)')
    db.run('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(50) NOT NUll, middle_name VARCHAR(50) NULL, last_name VARCHAR(50) NOT NULL, DOB DATE NOT NULL)')
    db.run('CREATE TABLE IF NOT EXISTS parties (id INT AUTO_INCREMENT PRIMARY KEY, party VARCHAR(50) NOT NUll, logo BLOB NULL)')
    db.run('CREATE TABLE IF NOT EXISTS positions (id INT AUTO_INCREMENT PRIMARY KEY, position VARCHAR(50) NOT NUll)')
    db.run('CREATE TABLE IF NOT EXISTS candidates (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(50) NOT NUll, middle_name VARCHAR(50) NULL, last_name VARCHAR(50), position_id INT NOT NULL, party_id INT NOT NULL, photo BLOB NOT NULL)')
    db.run('CREATE TABLE IF NOT EXISTS votes (id INT AUTO_INCREMENT PRIMARY KEY, candidate_id INT NOT NULL, vote INT NOT NULL)')

//   const stmt = db.prepare('INSERT INTO auth VALUES ("", "joe", "12345678")')

//   stmt.finalize()

  db.each('SELECT * from auth', (err, row) => {
    console.log(row)
  })

})


// db.close()

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

app.get("/voter-registration", (req, res) => {
    res.render("voter-registration.ejs")
})
 
app.post("/voter-registration", (req, res) => {
        const {first_name, middle_name, last_name, DOB, username, password} = req.body
        db.serialize(() => {
            db.run("INSERT INTO users VALUES (?,?,?,?,?)", [null,first_name, middle_name,last_name, DOB])
            })
            db.run("INSERT INTO auth VALUES(?,?,?,?)", [null,username,password, user_id = row.id])
        db.close()
})

app.post("/party-registration", (req, res) => {
        const {party, logo} = req.body
        db.serialize(() => {
            db.run("INSERT INTO party VALUES (?,?,?)", [null,party, logo])
            })
        db.close()
})
 

app.listen(port,()=>{
    console.log(`App is listening to port ${port}`)
})