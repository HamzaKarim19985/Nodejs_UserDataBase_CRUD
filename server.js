/*const mysql = require("mysql");
const Joi = require("joi");
const routes = require("./routes");
const http = require("http");
const json = require("json");
const bodyParser = require("body-parser");
const urlencoded = require("url");
const methodOverride = require("method-override");
const mysqlConnection = require("./connection");
const methodOverrider = require("method-override")  
const Router = express.Router();  
app.use(express.json());              */

//IMPORT MODULES
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
require("dotenv/config");

//IMPORT FROM LOCAL FILES
const connectDB = require("./server/database/connection");
const PORT = process.env.PORT || 3000;
//Log requests
app.use(morgan("tiny"));

//MONGODB connection, runs async function(connectDB()) from connection.js
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));

//Set view engine to default. Assume views folder contains ejs files
app.set("view engine", "ejs");
//app.use(express.static(__dirname + "/assets"));
//If ejs files are not in views folder, set views engine  to directory that has ejs files u wish to render
//app.set("views", path.resolve(__dirname, "views/ejsFolderName"));

//load assets according to directory
var css_path = path.resolve(__dirname, "assets/css");
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
//Implement Route path variables
const postsRoute = require("./server/Routes/posts");
const authRoute = require("./server/Routes/auth");

//Import ROUTES from router.js file
app.use("/", require("./server/Routes/router"));

//Middleware
app.use(express.json());
app.use(bodyParser.json());

//Routes middleware
app.use("/posts", postsRoute);
app.use("/auth/user", authRoute);

app.listen(PORT, () => {
  console.log("Server running");
});

/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://HamzaKarim:<password>@rest.2hj75.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
   */
