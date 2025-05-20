const recipeController = require("./Controller/recipeController");
const authController = require("./Controller/authController");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Connected to the server");
});

app.post("/auth/login", (req, res) => {
  authController.login(req, res);
});

app.post("/auth/register", (req, res) => {
  authController.register(req, res);
});

app.get("/auth/logout", (req, res) => {
  authController.logout(req, res);
});

app.post("/recipes", (req, res) => {
  recipeController.createRecipe(req, res);
});

app.get("/recipes/:id", (req, res) => {
  recipeController.getRecipeById(req, res);
});

app.get("/recipes", (req, res) => {
  recipeController.getAllRecipes(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
