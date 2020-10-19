const express = require("express");
const morgan = require("morgan");
const app = express();
const {handleAppsEndpoint} = require("./endpoints.js")


app.use(morgan("dev"));
app.get("/apps", handleAppsEndpoint)

module.exports = app;
