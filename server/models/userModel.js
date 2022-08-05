const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String}
});

const Users = mongoose.model("User", UserSchema);

module.exports = Users;