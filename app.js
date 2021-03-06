const express = require("express");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
require("./server/middleware/passport");
require("./config/");
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use("/uploads", express.static("uploads"));

// Require our routes into the application.
require("./server/routes")(app);
app.get("*", (req, res) => res.status(200).send("Welcome to nothingness."));

module.exports = app;
