export function login(req, res) {
  res.status(200).send("User Login");
}

export function register(req, res) {
  res.status(200).send("User Registration");
}

export function logout(req, res) {
  res.status(200).send("User Logout");
}
