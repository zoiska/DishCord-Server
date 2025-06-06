const { mongoose } = require("mongoose");

function getServiceStatus(req, res) {
  try {
    if (mongoose.connection.readyState === 1) {
      res.status(200).json({
        serverStatus: "online",
        databaseStatus: "online",
      });
    } else {
      res.status(500).json({
        serverStatus: "online",
        databaseStatus: "offline",
      });
    }
  } catch (error) {
    console.error("Error checking service status:", error);
    res.status(500).json({
      serverStatus: "offline",
      databaseStatus: "offline",
    });
  }
}

module.exports = {
  getServiceStatus,
};
