const { date, string } = require("joi");
const mongoose = require("mongoose");
var validator = require("email-validator");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    min: 6
  },
  gender: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
  
});

Schema.path('email').validate((email) => {
  if (!validator.validate(email)) { return false; }
  return true;
}, 'Email must have a valid format!');

const Userdb = mongoose.model("userdb", Schema);
module.exports = Userdb;
