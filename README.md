# u-develop-it

Use readme for notes during module //recap 12.1

CRUD
Create, read, update, and delete

check version/installation
sqlite3 --version

creates a document in specified directory
sqlite3 db/election.db

verify database connection/path
.database

help menu
.help

exit
.quit

run sqlite3
sqlite

open a file in a specified directory
.open db/election.db

display successfully executed create statements
.schema

display tables without create statements
.tables

print column headers
.headers on

format table into columns
.mode column

1.6

sqlite3 db/election.db < db/schema.sql
The < is called the input redirect. This will override the default standard input, which is the keyboard, and allows the input to come from a file instead. This is not a feature of SQLite but a feature of the shell running in your terminal. It's like loading a bunch of pretyped commands into sqlite3!

2.3

initialize Node.js (create package.json)
npm init --y

Now that we've created package.json, be sure to create the .gitingore file with the node_modules/ entry, as shown in the following line of code, so that we don't needlessly track or push all the npm packages to GitHub:

echo "node_modules/" > .gitignore

The preceding terminal command did two things: it created the .gitignore file, and it wrote node_modules/ to the file—a nifty trick for a necessary step in every new Node.js application.

npm install express sqlite3

npm install jest --save-dev

Although the tests were provided by a helpful meetup member, we should test them and verify their functionality.

To do this, let's change the current "test" script to the package.json file to the following:

"scripts": {
    "test": "jest",
  },
Now let's run the test suite in the terminal and confirm whether the function passes the tests, as follows:

npm test

Add the following to the scripts property in the package.json file below the "test" script we just added:

"migrate": "sqlite3 db/election.db < db/schema.sql",
"seed": "sqlite3 db/election.db < db/seeds.sql",
"db": "sqlite3 db/election.db"

We need to add one more script to start the Express.js server. Add the following to the package.json file under the db script:

"start": "node server.js"

migrate the schema.sql format
npm run migrate

add the information to the database from the seed.sql file
npm run seed

Create the server.js file in the root directory, using the following command at the command line:

touch server.js
Open the server.js file and import express at the top of the file, by adding the following code:

const express = require('express');
Add the PORT designation and the app expression, by adding the following code:

const PORT = process.env.PORT || 3001;
const app = express();
Add the Express.js middleware, by adding the following code:

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
Now let's add the function that will start the Express.js server on port 3001. Place the following code at the bottom of the server.js file:

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

3.5

SELECT * FROM candidates
LEFT JOIN parties ON candidates.party_id = parties.id;

SELECT candidates.*, parties.name
FROM candidates
LEFT JOIN parties ON candidates.party_id = parties.id;

3.7

What request type would be appropriate for updating data? 
We've established that GET is for reading, 
POST for creating, 
and DELETE for deleting. 
None of those make sense for updating, but there is a fourth request type we can use: the PUT request.