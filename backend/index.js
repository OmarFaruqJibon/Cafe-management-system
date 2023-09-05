const express = require("express");
const cors = require("cors");
const connection = require("./connection");


const app = express();
app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


app.get("/", (req, res) =>{
    res.send("Cafe management server running!")
})


module.exports = app;
