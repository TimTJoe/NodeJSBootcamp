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

    db.run('CREATE TABLE IF NOT EXISTS auth (id INTEGER  PRIMARY KEY AUTOINCREMENT, username VARCHAR(50) NOT NUll UNIQUE, password VARCHAR(50) NOT NULL, user_id INTEGER)')
    db.run('CREATE TABLE IF NOT EXISTS roles (id INTEGER  PRIMARY KEY AUTOINCREMENT, role VARCHAR(50) NOT NUll)')
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER  PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50) NOT NUll, middle_name VARCHAR(50) NULL, last_name VARCHAR(50) NOT NULL, DOB DATE NOT NULL)')
    db.run('CREATE TABLE IF NOT EXISTS parties (id INTEGER  PRIMARY KEY AUTOINCREMENT, party VARCHAR(50) NOT NUll, logo BLOB NULL)')
    db.run('CREATE TABLE IF NOT EXISTS positions (id INTEGER  PRIMARY KEY AUTOINCREMENT, position VARCHAR(50) NOT NUll)')
    db.run('CREATE TABLE IF NOT EXISTS candidates (id INTEGER  PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50) NOT NUll, middle_name VARCHAR(50) NULL, last_name VARCHAR(50), position_id INTEGER NOT NULL, party_id INTEGER NOT NULL, photo BLOB NOT NULL)')
    db.run('CREATE TABLE IF NOT EXISTS votes (id INTEGER  PRIMARY KEY AUTOINCREMENT, candidate_id INTEGER NOT NULL, vote INT NOT NULL)')

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
    db.each('SELECT * from auth', function(err, row) {
        const user = row.username === username && row.password === password
            if(user) {
               res.redirect("/dashboard")
            } else {
                console.log("Incorrect username or password")
                // res.send("Incorrect username or password")
            } 
    }
    )
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
    try {
        const {first_name, middle_name, last_name, DOB, username, password} = req.body

        db.run("INSERT INTO users VALUES(?,?,?,?,?)", [null,first_name, middle_name,last_name, DOB], function(err) {
                if(err) {
                    throw new Error(err)
                } else {
                    console.log(`Voter registered: `, this.lastID)
                    db.run("INSERT INTO auth VALUES(?,?,?,?)", [null, username,password, this.lastID])
                    res.redirect("/login")
                }
            })

        // res.send("Voter registration successful.")
    } catch (error) {
        res.send({message: "error occured", error})
    }
})

app.get("/party-registration", (req, res) => {
    res.render("party-registration.ejs")
})

app.post("/party-registration", (req, res) => {
    try {
        const {party, logo} = req.body
        const id = Date.now()
        // db.serialize(() => {
            db.run("INSERT INTO parties VALUES (?,?,?)", [id,party, logo])
            // })
            res.send("Party registration successful")
    } catch (error) {
        res.send("An error occurred", error)
    }
})

app.get("/votes", (req, res) => {
    res.render("vote.ejs")
})
 

app.listen(port,()=>{
    console.log(`App is listening to port ${port}`)
})