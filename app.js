const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const loginRoutes = require("./Routes/login");
const signUpRoutes = require("./Routes/signup");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/login", loginRoutes);
app.use("/signup", signUpRoutes);

module.exports = app;
