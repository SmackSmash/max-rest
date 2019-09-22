const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error(`Files of type ${file.mimetype} are not allowed`);
    error.status = 403;
    cb(error, false);
  }
};

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 4 }, fileFilter });

module.exports = upload;
