const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function getUserById(req, res) {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const id = decoded.id;
    try {
      const user = await User.findById(id).select(
        "username ownRecipes likedRecipes dislikedRecipes favoriteRecipes"
      );
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.status(200).json({ message: "Token verified, returning userData", user });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}

module.exports = {
  getUserById,
};
