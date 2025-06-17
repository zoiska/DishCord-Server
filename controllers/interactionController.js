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

      const isLiked = user.likedRecipes.some((id) => id.toString() === recipeId);
      const isDisliked = user.dislikedRecipes.some((id) => id.toString() === recipeId);
      if (sentiment === "like") {
        if (isLiked) {
          return res.status(400).json({ message: "Recipe already liked" });
        }
        user.likedRecipes.addToSet(recipeId);
        recipe.likeCount += 1;
        if (isDisliked) {
          user.dislikedRecipes.pull(recipeId);
          recipe.dislikeCount -= 1;
        }
        await user.save();
        await recipe.save();
        return res.status(200).json({ message: "Recipe liked successfully" });
      } else if (sentiment === "dislike") {
        if (isDisliked) {
          return res.status(400).json({ message: "Recipe already disliked" });
        }
        user.dislikedRecipes.addToSet(recipeId);
        recipe.dislikeCount += 1;
        if (isLiked) {
          user.likedRecipes.pull(recipeId);
          recipe.likeCount -= 1;
        }
        await user.save();
        await recipe.save();
        return res.status(200).json({ message: "Recipe disliked successfully" });
      } else {
        return res.status(400).json({ message: "Invalid sentiment value" });
      }
    } catch (error) {
      return res.status(500).json({ message: "internal server error: ", error });
    }
  });
}

module.exports = {
  bookmarkRecipe,
  sentimentRecipe,
};
