const express = require("express");
const authenticate = require("../middlewares/authenticate");
const userController = require("../controllers/user-controller");
const userRouter = express.Router();
const upload = require("../middlewares/upload");

// Endpoint สำหรับอัปเดตข้อมูลผู้ใช้
userRouter.patch(
  "/update",
  authenticate,
  // upload.single("profileImage"),
  userController.updateUser
);

// Route สำหรับการดึงข้อมูลผู้ใช้ทั้งหมด
userRouter.get("/all", userController.getAllUsers);

// Endpoint สำหรับดึงข้อมูลผู้ใช้ตาม ID
userRouter.get("/:profileId", userController.getUserById);

// Endpoint สำหรับอัปเดตสถานะ isAvailable
userRouter.patch(
  "/update-availability/:id",
  authenticate,
  userController.updateAvailability
);

// Endpoint สำหรับอัปเดตสถานะ isActive
userRouter.patch(
  "/update-active-status/:id",
  authenticate,
  userController.updateActiveStatus
);

module.exports = userRouter;
