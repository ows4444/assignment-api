const userController = require("../controllers").user;
const filmController = require("../controllers").film;
const commentController = require("../controllers").comment;

module.exports = (app) => {
  app.get("/api", (req, res) => res.status(200).send("Welcome to  API!"));
  app.post("/api/user", userController.create);
  app.get("/api/user", userController.list);
  app.post("/api/user/login", userController.login);
  app.get("/api/user/me", userController.profile);

  app.get("/api/film", filmController.list);
  app.post("/api/film", filmController.create);
  app.get("/api/film/:id", filmController.getOne);

  app.delete("/api/film/:id", filmController.delete);

  app.get("/api/film/:FilmId/comment", commentController.listByFilm);
  app.post("/api/film/:FilmId/comment", commentController.create);
  app.delete("/api/comment/:id", commentController.delete);
};
