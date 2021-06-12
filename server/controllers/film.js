const Film = require("../models").Film;
const { compose } = require("compose-middleware");
const { body, check } = require("express-validator");
const { validateReq } = require("../common");

module.exports = {
  getOne: compose([]),
  create: compose([]),
  delete: compose([]),

  list(req, res) {
    return Film.all()
      .then((films) => res.status(200).send(films))
      .catch((error) => res.status(400).send(error));
  },
};
