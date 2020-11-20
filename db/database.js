//4.4 Migrating lines from server.js to modularize db connection logic

const sqlite3 = require("sqlite3").verbose();

//2.3 Connect to database
const db = new sqlite3.Database("./db/election.db", err => {
    if (err) {
        return console.error(err.message);
    }

    console.log("Connected to the election database.");
});

//4.4 Because this file is its own module, we'll have to export
module.exports = db;