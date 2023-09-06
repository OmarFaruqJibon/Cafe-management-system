const express = require("express");
const cors = require("cors");
const connection = require("./connection");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");


const app = express();
app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Cafe management server running!")
});

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", [productRoute]);



module.exports = app;
