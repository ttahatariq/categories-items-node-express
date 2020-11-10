const mongoose = require("mongoose");
const modelSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  featured: { type: Boolean, default: false },
});

const Model = mongoose.model("Item", modelSchema);
module.exports = Model;
