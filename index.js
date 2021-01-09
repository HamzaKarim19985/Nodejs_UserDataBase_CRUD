const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World Default page");
});
app.get("/example", (req, res) => {
  res.send("/example URL page or example route");
});
app.get("/example/:name/:age", (req, res) => {
  //URL variables name and age
  console.log(req.params);
  res.send(req.params.name + ":" + req.params.age);
});

const port = process.env.port || 3000;
app.listen(3000);
