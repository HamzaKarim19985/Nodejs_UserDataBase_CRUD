const axios = require("axios");

//Render ejs files based on the routes, and then export the routes to router.js

exports.homeRoutes = (req, res) => {
  //Make get requst to api/users, pass on data to index.ejs
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.add_user = (req, res) => {
  res.render("add_user");
};
exports.update_user = (req, res) => {
  //Have info of user to be modified already filled in, in update_usser.ejs form
  axios
    .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    .then(function (userData) {
      console.log(req.query.id);
      res.render("update_user", { user: userData.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
