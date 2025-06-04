const Recipe = require("../models/recipe");

async function getAllRecipes(req, res) {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getRecipeById(req, res) {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findOne({ id: id });
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createRecipe(req, res) {
  try {
    const imageUrls = req.files?.map((file) => `/uploads/${req.file.filename}`) || [];
    const newRecipe = new Recipe({
      ...req.body,
      imageUrls,
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Error creating recipe" });
  }

  res.status(201).send("Create a new Recipe");
}

async function searchRecipes(req, res) {
  const { query } = req.query;
  try {
    const recipes = await Recipe.find({ name: new RegExp(query, "i") });
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error searching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  searchRecipes,
};
