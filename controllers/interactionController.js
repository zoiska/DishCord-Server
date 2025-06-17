const User = require("../models/user");
const Recipe = require("../models/recipe");
const jwt = require("jsonwebtoken");

async function bookmarkRecipe(req, res) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No valid token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;
    const { recipeId } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      const isAlreadyBookmarked = user.favoriteRecipes.some((id) => id.toString() === recipeId);
      if (isAlreadyBookmarked) {
        user.favoriteRecipes.pull(recipeId);
        await user.save();
        return res.status(200).json({ message: "Recipe removed from bookmarks" });
      } else {
        user.favoriteRecipes.addToSet(recipeId);
        await user.save();
        return res.status(200).json({ message: "Recipe bookmarked successfully" });
      }
    } catch (error) {
      return res.status(500).json({ message: "internal server error: ", error });
    }
  });
}

async function sentimentRecipe(req, res) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No valid token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const userId = decoded.id;
    const { recipeId, sentiment } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      if (sentiment !== "like" && sentiment !== "dislike") {
        return res.status(400).json({ message: "Invalid sentiment value" });
      } else if (sentiment === "like" && !user.likedRecipes.includes(recipeId)) {
        recipe.likeCount += 1;
        user.likedRecipes.push(recipeId);
      } else if (sentiment === "dislike" && !user.dislikedRecipes.includes(recipeId)) {
        recipe.dislikeCount += 1;
        user.dislikedRecipes.push(recipeId);
      } else if (
        sentiment === "like" &&
        !user.likedRecipes.includes(recipeId) &&
        user.dislikedRecipes.includes(recipeId)
      ) {
        recipe.likeCount += 1;
        recipe.dislikeCount -= 1;
        user.likedRecipes.push(recipeId);
        const index = user.dislikedRecipes.indexOf(recipeId);
        if (index > -1) {
          user.dislikedRecipes.splice(index, 1);
        }
      } else if (
        sentiment === "dislike" &&
        !user.dislikedRecipes.includes(recipeId) &&
        user.likedRecipes.includes(recipeId)
      ) {
        recipe.dislikeCount += 1;
        recipe.likeCount -= 1;
        user.dislikedRecipes.push(recipeId);
        const index = user.likedRecipes.indexOf(recipeId);
        if (index > -1) {
          user.likedRecipes.splice(index, 1);
        }
      } else if (
        (sentiment === "like" && user.likedRecipes.includes(recipeId)) ||
        (sentiment === "dislike" && user.dislikedRecipes.includes(recipeId))
      ) {
        return res.status(400).json({ message: "Sentiment already set to this value" });
      }
      await user.save();
      await recipe.save();
      return res.status(200).json({ message: "Recipe sentiment updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: "internal server error: ", error });
    }
  });
}

module.exports = {
  bookmarkRecipe,
  sentimentRecipe,
};
