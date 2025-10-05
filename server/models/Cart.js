const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  labTests: [
    {
      testName: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);