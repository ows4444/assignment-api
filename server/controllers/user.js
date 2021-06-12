const User = require("../models").User;
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { compose } = require("compose-middleware");
const { body, check } = require("express-validator");
const { validateReq } = require("../common");
const { JWT_TOKEN, TOKEN_EXPIRATION_TIME } = require("../../config");

const SignInValidation = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("must be required")
    .isEmail()
    .withMessage("must be a email")
    .normalizeEmail(),
  check("password").not().isEmpty().withMessage("must be required"),
];
const SignUpValidation = [
  body("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long"),
  body("name").not().isEmpty().withMessage("must be required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("must be required")
    .isEmail()
    .withMessage("must be a email")
    .normalizeEmail(),
  body("email").custom((email) => {
    return User.findOne({ where: { email } }).then((user) => {
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    });
  }),
];

module.exports = {
  profile: compose([
    passport.authenticate("bearer"),
    (req, res) => res.json(req.user),
  ]),
  login: compose([
    SignInValidation,
    validateReq("Sign Up Failed!"),
    passport.authenticate("local"),
    (req, res) => {
      const token = jwt.sign(
        {
          id: req.user.id,
        },
        JWT_TOKEN,
        { expiresIn: TOKEN_EXPIRATION_TIME }
      );

      res.status(200).send({ token });
    },
  ]),

  create: compose([
    SignUpValidation,
    validateReq("User Registration Failed!"),
    async (req, res) => {
      const { name, email, password } = req.body;

      return User.create({
        name,
        email: email.toLowerCase(),
        password,
      })
        .then((users) => res.status(201).send(users))
        .catch((error) => res.status(400).send(error));
    },
  ]),
  list(req, res) {
    return User.all()
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  },
};
