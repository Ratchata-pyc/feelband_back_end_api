// const express = require("express");
const multer = require("multer");
const path = require("path");

// const router = express.Router();

// ตั้งค่าการเก็บไฟล์สำหรับ multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "public", "images", "profiles")); // กำหนดไดเรกทอรีที่ไฟล์จะถูกเก็บ
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // กำหนดชื่อไฟล์
  },
});

// เริ่มต้นใช้งาน multer ด้วยการตั้งค่า storage
const upload = multer({ storage: storage });
module.exports = upload;
