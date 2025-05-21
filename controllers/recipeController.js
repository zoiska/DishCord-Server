const recipes = require("../cooldatabase");
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
  const id = req.params.id;
  const recipe = recipes.find((r) => r.id === id);

  if (recipe) {
    res.status(200).json(recipe);
  } else {
    res.status(404).json("This is not the recipe you are looking for 👻");
  }
}

async function createRecipe(req, res) {
  res.status(200).send("Create a new Recipe");
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
};
