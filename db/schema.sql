CREATE TABLE candidates (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    industry_connected BOOLEAN NOT NULL
);

CREATE TABLE parties (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

/* 3.3
With the parties table added to the schema, run the following migrate script again:

npm run migrate

Remember, npm run migrate was a custom script we added to the package.json file to run sqlite3 db/election.db < db/schema.sql for us.
 */