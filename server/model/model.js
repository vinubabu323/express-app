const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: String,
  status: String,
  image: String,
  deleted: false,
});

const UserDB = mongoose.model("userdb", schema);

module.exports = UserDB;