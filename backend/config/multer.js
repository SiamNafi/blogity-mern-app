import multer from "multer";
import { createError } from "../utils/erroHandler.js";
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedFiles = ["image/jpg", "image/png", "image/jpeg", "image/webp"];
  if (!allowedFiles.includes(file.mimetype)) {
    cb(createError(400, "Only images are allowed"), false);
  } else {
    cb(null, true);
  }

  // To accept the file pass `true`, like so:

  // You can always pass an error if something goes wrong:
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
