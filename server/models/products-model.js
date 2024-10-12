const mongoose = require("mongoose");
const { type } = require("os");
let Schema = mongoose.Schema;
let productsSchema = new Schema({
 id: {type: Number},
 text: { type: String },
 price: { type: String },
 image: {type: String},
 teg: {type: String}
});
let Products = mongoose.model("Products", productsSchema);

module.exports = Products;