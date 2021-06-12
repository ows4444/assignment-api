const userController = require("../controllers").user;

module.exports = (app) => {
  app.get("/api", (req, res) => res.status(200).send("Welcome to  API!"));

  app.post("/api/user", userController.create);
  app.get("/api/user", userController.list);
  app.post("/api/user/login", userController.login);
};
