const express = require("express");
const logger = require("morgan");
const passport = require("passport");
require("./server/middleware/passport");
require("./config/");
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Require our routes into the application.
require("./server/routes")(app);

app.get("*", (req, res) => res.status(200).send("Welcome to nothingness."));

module.exports = app;
