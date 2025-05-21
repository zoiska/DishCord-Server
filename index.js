require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authController = require("./controllers/authController");
const recipeController = require("./controllers/recipeController");

const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.use(cors());
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB could not connect:", err);
  });

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
