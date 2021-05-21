var Userdb = require("../Model/model");
const { userDBValidation } = require("../../validation");
let alert = require('alert'); 
//Uses  Userdb model from model.js
//Create and save new user
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message:
        "Request body content cannot be empty, must contain Userdb model",
    });
    return;
  }
  //Create user from req body user sent from form.js form submission, where action and method match
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  //Validate user object sent by user
  /*const { error } = userDBValidation(user);
  if (error) { 
    alert(error.details[0].message);
    return;
  } */
  //Where data is the object that was saved
  user
    .save(user)
    .then((data) => {
      //redirects to add_user page whose form submits new user
      res.redirect("/add_user");
    })
    .catch((err) => {    
        alert(err.message);
        return;
    });
};

//Retrieve and return all users from mongoose collection
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: "Not found user with ID:" + id });
        }
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occured while retrieving User with ID" + id,
        });
      });
  } else {
    Userdb.find()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error occured while retrieving Users",
        });
      });
  }
};

//update an identified user
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update cannot be empty, must contain Userdb model",
    });
    return;
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "ID of object to update is incorrect or object sent by req.bod is incorrect or something else" +
            id,
        });
        return;
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while retrieving Users",
      });
    });
};

//Delete an identified user
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot delete object with ID:" + id,
        });
        return;
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while retrieving Users",
      });
    });
};

//Return all users
