const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); // For generating unique file names

const storage = multer.diskStorage({
  destination: "uploads/", 
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = { upload };
