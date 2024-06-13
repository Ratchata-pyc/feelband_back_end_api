const express = require("express");
const multer = require("multer");
const path = require("path");
const generateFullUrl = require("../middlewares/generateFullUrl"); // นำเข้า middleware ที่สร้าง URL แบบสมบูรณ์

const router = express.Router();

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

// สร้าง endpoint สำหรับการอัปโหลดรูปโปรไฟล์
router.post(
  "/upload-profile-image", // URL endpoint สำหรับการอัปโหลดรูปโปรไฟล์
  generateFullUrl, // เพิ่ม middleware สำหรับการสร้าง URL แบบสมบูรณ์
  upload.single("profileImage"), // Middleware สำหรับการจัดการอัปโหลดไฟล์เดียวโดยใช้ field name 'profileImage'
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" }); // ส่งคำตอบเมื่อไม่มีการอัปโหลดไฟล์
    }
    const filePath = `/images/profiles/${req.file.filename}`; // กำหนด path ของไฟล์ที่เก็บ
    const fullUrl = req.generateFullUrl(filePath); // ใช้ฟังก์ชันใน middleware เพื่อสร้าง URL แบบสมบูรณ์

    // เพิ่มการพิมพ์ log เพื่อการตรวจสอบ
    console.log("File path:", filePath);
    console.log("Full URL:", fullUrl);

    res
      .status(200)
      .json({ message: "File uploaded successfully", filePath: fullUrl }); // ส่งคำตอบสำเร็จพร้อม URL ของไฟล์ที่อัปโหลด
  }
);

module.exports = router; // ส่งออก router นี้
