const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/auth/login", (req, res) => {
  res.send("User Login");
});

app.get("/auth/register", (req, res) => {
  res.send("User Registration");
});

app.get("/auth/logout", (req, res) => {
  res.send("User Logout");
});

app.post("/recipes", (req, res) => {
  res.send("Create a new Recipe");
});

app.get("/recipes/:id", (req, res) => {
  res.send(`Show Recipe with ID`);
});

app.get("/recipes", (req, res) => {
  res.send("Show all Recipes");
});
