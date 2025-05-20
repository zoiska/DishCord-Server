function login(req, res) {
  res.status(200).send("User Login");
}

function register(req, res) {
  res.status(200).send("User Registration");
}

function logout(req, res) {
  res.status(200).send("User Logout");
}

module.exports = {
  login,
  register,
  logout,
};
