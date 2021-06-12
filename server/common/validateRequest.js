function validateReq(title = "an error occurred") {
  return (req, res, next) => {
    var errorValidation = require("express-validator").validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(400).json({
        title,
        errors: errorValidation.mapped(),
      });
    }
    next();
  };
}
module.exports = {
  validateReq,
};
