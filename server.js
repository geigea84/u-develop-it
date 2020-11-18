const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});