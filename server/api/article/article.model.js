const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  link: String,
  tags: [],
  accepted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Article", articleSchema);
