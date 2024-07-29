const express = require("express");
const path = require ("path")
const bodyParser =require("body-parser")
const app = express();
const port= 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static((path.join(__dirname, "public"))))
app.set("view engine", "ejs")

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./elections.db')

db.serialize(() => {

    db.run('CREATE TABLE IF NOT EXISTS auth (id INTEGER  PRIMARY KEY AUTOINCREMENT, username VARCHAR(50) NOT NUll UNIQUE, password VARCHAR(50) NOT NULL, user_id INTEGER)')

    db.run('CREATE TABLE IF NOT EXISTS roles (id INTEGER  PRIMARY KEY AUTOINCREMENT, role VARCHAR(50) NOT NUll)')

    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER  PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50) NOT NUll, middle_name VARCHAR(50) NULL, last_name VARCHAR(50) NOT NULL, DOB DATE NOT NULL, photo BLOB NULL, role_id INT NOT NULL)')

    db.run('CREATE TABLE IF NOT EXISTS parties (id INTEGER  PRIMARY KEY AUTOINCREMENT, party VARCHAR(50) NOT NUll, logo BLOB NULL)')

    db.run('CREATE TABLE IF NOT EXISTS positions (id INTEGER  PRIMARY KEY AUTOINCREMENT, position VARCHAR(50) NOT NUll)')

    db.run('CREATE TABLE IF NOT EXISTS candidates (id INTEGER  PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50) NOT NUll, middle_name VARCHAR(50) NULL, last_name VARCHAR(50), position_id INTEGER NOT NULL, party_id INTEGER NOT NULL, photo BLOB NOT NULL)')

    db.run('CREATE TABLE IF NOT EXISTS votes (id INTEGER  PRIMARY KEY AUTOINCREMENT, candidate_id INTEGER NOT NULL, vote INT NOT NULL)')

})


app.get("/dashboard", (req,res)=>{
    res.render("dashboard.ejs")
})

app.get("/", (req,res)=>{
    res.render("index.ejs")
})

app.get("/login", (req,res)=>{
    res.render("login.ejs")
})

// Handle POST request to /login endpoint
app.post("/login", (req, res) => {
    // Extract username and password from request body
    const { username, password } = req.body;
    
    // Query the database to find a matching username and password
    db.get('SELECT * from auth WHERE username=? AND password=?', [username, password], function(err, row) {
        if (row) {
            // Redirect to the dashboard page upon successful login
            res.redirect("/dashboard"); 
        } else {
            // If no matching user is found, log the error
            console.error(err);
        }
    });

});


app.get("/voter-registration", (req, res) => {
     // Query the database to find a matching username and password
     db.all('SELECT * FROM roles', function(err, row) {
        if (row) {
            console.log(row)
            res.render("voter-registration.ejs", {row})
        } else {
            console.error(err);
        }
    });
})
 
// Handle POST request to /voter-registration endpoint
app.post("/voter-registration", (req, res) => {
        // Destructure required fields from request body
        const {first_name, middle_name, last_name, DOB, username, password, photo, role} = req.body;
        // Insert user information into 'users' table in the database
        db.run("INSERT INTO users VALUES(?,?,?,?,?,?,?)", [null, first_name, middle_name, last_name, DOB,photo, role], function(err) { 
            if(err) { 
                // If there's an error, throw it
                console.error(err)
            } else { 
                // Insert auth information into 'auth' table using last inserted ID
                db.run("INSERT INTO auth VALUES(?,?,?,?)", [null, username, password, this.lastID]);
                // Redirect to login page after successful registration
                res.redirect("/login");
            }
        });
});

app.get("/party-registration", (req, res) => {
    res.render("party-registration.ejs")
})

// Handle POST requests to "/party-registration"
app.post("/party-registration", (req, res) => {
        // Destructure party and logo from the request body
        const { party, logo } = req.body;

        // Insert party details into the database
        db.run("INSERT INTO parties VALUES (?,?,?)", [null, party, logo], function(err) {
            if (!err) {
                // Redirect to the dashboard if insertion is successful
                res.redirect("/dashboard");
            } else {
                // console log if insertion fails
                console.error(err)
            }
        });
});


app.get("/votes", (req, res) => {
    res.render("vote.ejs")
})
 

app.listen(port,()=>{
    console.log(`App is listening to port ${port}`)
})