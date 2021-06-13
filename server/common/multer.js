const multer = require("multer");
const uuid = require("uuid");
const mime = require("mime-types");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${uuid.v4()}.${mime.extension(file.mimetype)}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    let error = new multer.MulterError();
    error.message = `${file.mimetype} is not Supported`;
    cb(error);
  }
};
const upload = multer({ storage: storage, limits: { fileSize: 5 * Math.pow(1024, 2) }, fileFilter: fileFilter });

module.exports = { upload };
