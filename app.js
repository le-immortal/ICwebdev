const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");



const app = express();

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true, useUnifiedTopology: true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("login",{title:"hello"});
});


app.listen(3000, ()=>{
    console.log("Server Ready");
});