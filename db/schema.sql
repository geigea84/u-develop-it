DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS voters;

CREATE TABLE parties (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE candidates (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    industry_connected BOOLEAN NOT NULL,
    party_id INTEGER UNSIGNED,
    CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);

/* 4.3 */
CREATE TABLE voters (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

/* 3.3
With the parties table added to the schema, run the following migrate script again:

npm run migrate

Remember, npm run migrate was a custom script we added to the package.json file to run sqlite3 db/election.db < db/schema.sql for us.

3.4
We've added a new line to the table called a constraint. This allows us to flag the party_id field as an official foreign key and tells 
QL which table and field it references. In this case, it references the id field in the parties table. This ensures that no id can be 
inserted into the candidates table if it doesn't also exist in the parties table. SQLite will return an error for any operation that 
would violate a constraint.

Because this constraint relies on the parties table, the parties table MUST be defined first before the candidates table. 
Make sure you order your tables in schema.sql correctly.
 */