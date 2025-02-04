let mongoose = require("mongoose");

let Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});
let User = mongoose.model("User", UserSchema);

module.exports = User;