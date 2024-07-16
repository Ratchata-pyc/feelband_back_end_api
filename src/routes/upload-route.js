const express = require("express");
const generateFullUrl = require("../middlewares/generateFullUrl"); // นำเข้า middleware ที่สร้าง URL แบบสมบูรณ์
const uploadController = require("../controllers/upload-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const uploadRouter = express.Router();

// สร้าง endpoint สำหรับการอัปโหลดรูปโปรไฟล์
uploadRouter.post(
  "/upload-profile-image", // URL endpoint สำหรับการอัปโหลดรูปโปรไฟล์
  generateFullUrl, // เพิ่ม middleware สำหรับการสร้าง URL แบบสมบูรณ์
  authenticate,
  upload.single("profileImage"), // Middleware สำหรับการจัดการอัปโหลดไฟล์เดียวโดยใช้ field name 'profileImage'
  uploadController.uploadProfileImage
);

module.exports = uploadRouter; // ส่งออก router นี้
