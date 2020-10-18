const express = require("express");
const morgan = require("morgan");
const app = express();
const {handleAppsEndpoint} = require("./endpoints.js")
const playStore = require("./playstore.js")

app.get("/apps", handleAppsEndpoint)

app.listen(8000, ()=>{
  console.log("Listening on port 8000...")
})