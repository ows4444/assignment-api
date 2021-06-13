const Film = require("../models").Film;
const { upload } = require("../common/multer");
const { compose } = require("compose-middleware");
const { body, checkSchema, param } = require("express-validator");
const { validateReq } = require("../common");
const FilmGetValidation = [param("id").isNumeric().withMessage("must be required Number").toInt()];
const FilmPostValidation = [
  body("name").not().isEmpty().withMessage("must be required"),
  body("description").not().isEmpty().withMessage("must be required"),
  body("releaseDate")
    .not()
    .isEmpty()
    .withMessage("must be required")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("must be Formatted pattern YYYY-MM-DD"),
  body("rating")
    .not()
    .isEmpty()
    .withMessage("must be required") //
    .isNumeric()
    .withMessage("must be required Number")
    .toInt()
    .isInt({ min: 1, max: 5 })
    .withMessage("must be from 1 to 5"),
  body("ticketPrice")
    .not()
    .isEmpty()
    .withMessage("must be required") //
    .isNumeric()
    .withMessage("must be required Number")
    .toInt()
    .isInt({ min: 1, max: 1000 })
    .withMessage("must be from 1 to 1000"),
  body("country").not().isEmpty().withMessage("must be required"),
  body("genre").not().isEmpty().withMessage("must be required").toArray(),

  checkSchema({
    photo: {
      custom: {
        options: (value, { req, path }) => !!req.files[path],
        errorMessage: "must be required File",
      },
    },
  }),
];
module.exports = {
  delete: compose([
    FilmGetValidation,
    validateReq(),
    async (req, res) => {
      const { id } = req.params;
      try {
        await Film.destroy({ where: { id } });
        res.status(200).send({ message: "Film Deleted!", film: { id } });
      } catch (error) {
        res.status(400).send(error);
      }
    },
  ]),
  getOne: compose([
    FilmGetValidation,
    validateReq(),
    (req, res) => {
      const { id } = req.params;
      return Film.findOne({ where: { id } })
        .then((film) => {
          if (!film) res.status(404).send({ error: "Film Not Found!" });
          return res.status(200).send(film);
        })

        .catch((error) => res.status(400).send(error));
    },
  ]),
  create: compose([
    upload.fields([{ name: "photo", maxCount: 1 }]),
    FilmPostValidation,
    validateReq("Film Creating Failed!"),
    (req, res) => {
      const { name, description, releaseDate, rating, ticketPrice, country, genre } = req.body;
      const { filename: photo } = req.files["photo"][0];
      return Film.create({ name, description, releaseDate, rating, ticketPrice, country, genre, photo })
        .then((film) => res.status(201).send(film))
        .catch((error) => res.status(400).send(error));
    },
  ]),

  list(req, res) {
    return Film.findAll()
      .then((films) => res.status(200).send(films))
      .catch((error) => res.status(400).send(error));
  },
};
