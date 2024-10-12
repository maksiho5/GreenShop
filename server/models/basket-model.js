const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    id: { type: String, required: true },
    text: { type: String, required: true },
    price: { type: String, required: true },
    image: {type: String, require: true},
    count: {type: Number, default: 1}
});

const basketSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    products: { type: [productSchema], default: [] }
});

const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;
