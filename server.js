const express = require("express");
//4.4 Importing new module from database.js
const db = require("./db/database");

const PORT = process.env.PORT || 3001;
const app = express();

//4.4
const apiRoutes = require("./routes/apiRoutes");

//Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//4.4 use api routes
app.use("/api", apiRoutes);
/* By adding the /api prefix here, we can remove 
it from the individual route expressions after 
we move them to their new home. */

/* Remember that you don't have to specify index.js 
in the path (e.g., ./routes/apiRoutes/index.js). 
If the directory has an index.js file in it, 
Node.js will automatically look for it when 
requiring the directory. */

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

//Default response for any other request (Not Found) catch all
//Make this one the last route
app.use((req, res) => {
    res.status(404).end();
});

//Start server after DB connection
db.on("open", () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});