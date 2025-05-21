const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  id: String,
  name: String,
  ingredients: [{ name: String, amount: String }],
  preparation: String,
  category: { name: String },
  tags: [{ name: String }],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
