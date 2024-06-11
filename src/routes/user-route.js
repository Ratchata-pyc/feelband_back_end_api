const express = require("express");
const authenticate = require("../middlewares/authenticate");
const userController = require("../controllers/user-controller");

const userRouter = express.Router();

// Endpoint สำหรับอัปเดตข้อมูลผู้ใช้
userRouter.patch("/update", authenticate, userController.updateUser);

// Route สำหรับการดึงข้อมูลผู้ใช้ทั้งหมด
userRouter.get("/all", userController.getAllUsers);

// Endpoint สำหรับดึงข้อมูลผู้ใช้ตาม ID
userRouter.get("/:profileId", userController.getUserById);

module.exports = userRouter;
