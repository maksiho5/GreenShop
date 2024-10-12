const mongoose = require("mongoose");
const { type } = require("os");
let Schema = mongoose.Schema;
let tokenSchema = new Schema({
user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, // сылается на модель пользователя 
refreshToken: { type: String, required: true },
});
let Token = mongoose.model("Token", tokenSchema);

module.exports = Token;