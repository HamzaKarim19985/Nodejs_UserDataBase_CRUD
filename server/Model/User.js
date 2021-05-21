const { date } = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  date: {
    type: Date,
    Default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
