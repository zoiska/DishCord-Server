const recipes = require("./cooldatabase");

export function getAllRecipes(req, res) {
  if (recipes) {
    res.status(200).json(recipes);
  } else {
    res.status(500).json("Database gone");
  }
}

export function getRecipeById(req, res) {
  const id = req.params.id;
  const recipe = recipes.find((r) => r.id === id);

  if (recipe) {
    res.status(200).json(recipe);
  } else {
    res.status(404).json("This is not the recipe you are looking for 👻");
  }
}

export function createRecipe(req, res) {
  res.status(200).send("Create a new Recipe");
}
