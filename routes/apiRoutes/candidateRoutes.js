//4.4
const express = require("express");
const router = express.Router();
const db = require("../../db/database");
const inputCheck = require("../../utils/inputCheck");

//4.4 Remove all candidate routes from server.js and place here
//Now using router const, update all app to router

//2.4 Return all the data in the candidates table
//2.5 Get all candidates
router.get("/candidates", (req, res) => {
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
router.get("/candidate/:id", (req, res) => {
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

//3.7 app.put (now router.put) to change candidates preferred party
/* This route might feel a little strange because we're 
using a parameter for the candidate's id (req.params.id), 
but the request body contains the party's id (req.body.party_id). 
Why mix the two? Again, we want to follow best practices for 
consistency and clarity. The affected row's id should always 
be part of the route (e.g., /api/candidate/2) while the actual 
fields we're updating should be part of the body. */
//4.4 /api/candidate/2 is now /candidate/2
router.put("/candidate/:id", (req, res) => {
    const errors = inputCheck(req.body, "party_id");
    if (errors) {
        res.status(400).json({error: errors});
        return;
    }
    const sql = `UPDATE candidates SET party_id = ?
                WHERE id = ?`
    const params = [req.body.party_id, req.params.id];
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: req.body,
            changes: this.changes
        });
    });
});

//2.4 Delete a candidate
//2.6 updated Delete a candidate
//(?) denotes a placeholder, making this a prepared statement
router.delete("/candidate/:id", (req, res) => {
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
router.post("/candidate", ({body}, res) => {
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

//4.4 Exporting router object
module.exports = router;