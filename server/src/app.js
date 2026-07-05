const express = require("express");

const app = express();

//middleware to parse json
app.use(express.json());

//health route
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        service: "resource-capacity-planner"
    });
});
module.exports = app;