const mongoose = require("mongoose");
const modelSchema = new mongoose.Schema({
  title: String,
  featured: { type: Boolean, default: false },
});

const Model = mongoose.model("Category", modelSchema);
module.exports = Model;
