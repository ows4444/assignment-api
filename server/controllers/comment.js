const Comment = require("../models").Comment;
const User = require("../models").User;
const { compose } = require("compose-middleware");
const passport = require("passport");
const { body, checkSchema, param } = require("express-validator");
const { validateReq } = require("../common");
const PostCommentsValidation = [
  param("FilmId").isNumeric().withMessage("must be required Number").toInt(),
  body("content").not().isEmpty().withMessage("must be required"),
];
const GetCommentsValidation = [param("FilmId").isNumeric().withMessage("must be required Number").toInt()];
const DeleteCommentsValidation = [param("id").isNumeric().withMessage("must be required Number").toInt()];

module.exports = {
  listByFilm: compose([
    GetCommentsValidation,
    validateReq(),
    (req, res) => {
      const { content } = req.body;
      const { FilmId } = req.params;
      return Comment.findAll({
        where: { FilmId },
        include: { model: User, as: "user", attributes: ["name"] },
      })
        .then((comment) => res.status(200).send(comment))
        .catch((error) => res.status(400).send(error));
    },
  ]),
  create: compose([
    PostCommentsValidation,
    validateReq("Comment Creating Failed!"),
    passport.authenticate("bearer"),
    (req, res) => {
      const { id: UserId } = req.user;
      const { content } = req.body;
      const { FilmId } = req.params;
      return Comment.create({
        UserId,
        FilmId,
        content,
      })
        .then((comment) => res.status(201).send(comment))
        .catch((error) => res.status(400).send(error));
    },
  ]),
  delete: compose([DeleteCommentsValidation, validateReq(), passport.authenticate("bearer")], async (req, res) => {
    const { id: UserId } = req.user;
    const { id } = req.params;

    try {
      await Comment.destroy({ where: { UserId, id } });
      res.status(200).send({ message: "Comment Deleted!", film: { id } });
    } catch (error) {
      res.status(400).send(error);
    }
  }),
};
