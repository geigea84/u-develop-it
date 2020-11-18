const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const inputCheck = require("./utils/inputCheck");

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//2.3 Connect to database
const db= new sqlite3.Database("./db/election.db", err => {
    if (err) {
        return console.error(err.message);
    }

    console.log("Connected to the election database");
});

//GET test route
/* 2.3 We chose the route method get() and the 
response method res.json() to send the response 
message "Hello World" back to the client. */
/*
app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});
*/


//2.4 Return all the data in the candidates table
//2.5 Get all candidates
app.get("/api/candidates", (req, res) => {
    const sql = `SELECT candidates.*, parties.name
                AS party_name
                FROM candidates
                LEFT JOIN parties
                ON candidates.party_id = parties.id`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});



//2.4 GET a single candidate
//2.5 updated Get a single candidate
app.get("/api/candidate/:id", (req, res) => {
    const sql = `SELECT candidates.*, parties.name
                AS party_name
                FROM candidates
                LEFT JOIN parties
                ON candidates.party_id = parties.id
                WHERE candidates.id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: row
        });
    });
});



//2.4 Delete a candidate
//2.6 updated Delete a candidate
//(?) denotes a placeholder, making this a prepared statement
app.delete("/api/candidate/:id", (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({error: res.message});
            return;
        }
        res.json({
            message: "successfully deleted",
            changes: this.changes
        });
    });
});


//2.7 updated Create a candidate post route
app.post("/api/candidate", ({body}, res) => {
    const errors = inputCheck(body, "first_name", "last_name", "industry_connected");
    if (errors) {
        res.status(400).json({error: errors});
        return;
    }

    //2.4 Create a candidate
    //2.7 updated Create a candidate database call
    //this looks different than the others because SQLite needs to autogen the id
    const sql = `INSERT INTO candidates 
                (first_name, last_name, industry_connected) 
                VALUES 
                (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];
    //ES5 function (not arrow function) to use `this`
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: body,
            id: this.lastID
        });
    });
});

//Default response for any other request (Not Found) catch all
//Make this one the last route
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});