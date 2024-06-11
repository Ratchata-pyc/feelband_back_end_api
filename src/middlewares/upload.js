// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images/profiles");
//   },
//   filename: (req, file, cb) => {
//     const filename = `${new Date().getTime()}${Math.round(
//       Math.random() * 100000
//     )}.${file.mimetype.split("/")[1]}`;

//     cb(null, filename);
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;

// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "public/images/profiles"));
//   },
//   filename: (req, file, cb) => {
//     const filename = `${new Date().getTime()}${Math.round(
//       Math.random() * 100000
//     )}.${file.mimetype.split("/")[1]}`;
//     cb(null, filename);
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;

const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Setting up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/profiles"); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Naming the file
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Create endpoint for uploading profile image
router.post(
  "/upload-profile-image",
  upload.single("profileImage"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = `/images/profiles/${req.file.filename}`;
    res
      .status(200)
      .json({ message: "File uploaded successfully", filePath: filePath });
  }
);

module.exports = router;
