const hashService = require("../services/hash-service"); // นำเข้า hashService สำหรับการแฮชและตรวจสอบรหัสผ่าน
const jwtService = require("../services/jwt-service"); // นำเข้า jwtService สำหรับการสร้างและตรวจสอบ JSON Web Token
const userService = require("../services/user-service"); // นำเข้า userService สำหรับการจัดการข้อมูลผู้ใช้ในฐานข้อมูล
const createError = require("../utils/create-error"); // นำเข้า createError สำหรับการสร้างข้อผิดพลาด
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); // นำเข้าและกำหนดค่า PrismaClient

const userController = {}; // สร้างวัตถุ authController เพื่อเก็บฟังก์ชันต่างๆ สำหรับการยืนยันตัวตน

// ฟังก์ชันสำหรับการอัปเดตข้อมูลผู้ใช้
userController.updateUser = async (req, res, next) => {
  try {
    const userId = req.user.id; // ดึง ID ผู้ใช้จาก token ที่ authenticate
    const data = req.body; // ดึงข้อมูลที่ผู้ใช้ส่งมา

    // ลบข้อมูล isAdmin เพื่อป้องกันการอัปเดต
    delete data.isAdmin;

    // อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
    const updatedUser = await userService.updateUserById(data, userId);

    if (!updatedUser) {
      createError({
        message: "User not found", // ถ้าผู้ใช้ไม่พบในฐานข้อมูล
        statusCode: 404,
      });
    }

    // ลบข้อมูล password ก่อนส่งผลลัพธ์กลับไป
    delete updatedUser.password;
    delete updatedUser.isAdmin;

    // ส่งสถานะและข้อมูลผู้ใช้ที่อัปเดตกลับไปให้ client
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    next(err); // ส่งข้อผิดพลาดไปยัง middleware ถัดไป
  }
};

// ฟังก์ชันสำหรับการดึงข้อมูลผู้ใช้ตาม ID
userController.getUserById = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.profileId); // ดึง ID ผู้ใช้จาก URL parameter

    const user = await userService.findUserById(userId); // ค้นหาผู้ใช้จาก ID

    if (!user) {
      // ถ้าผู้ใช้ไม่พบในฐานข้อมูล
      return res.status(404).json({
        message: "User not found",
      });
    }
    // ลบข้อมูล password ก่อนส่งผลลัพธ์กลับไป
    delete user.password;
    delete user.isAdmin;

    // ส่งข้อมูลผู้ใช้กลับไปยังลูกค้า
    return res.status(200).json({ user });
  } catch (error) {
    // จัดการข้อผิดพลาด
    next(error);
  }
};

// ฟังก์ชันสำหรับการดึงข้อมูลผู้ใช้ทั้งหมด
userController.getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true, // เพิ่มการเลือก id ด้วย
        firstName: true,
        lastName: true,
        budget: true,
        role: {
          select: {
            id: true,
            role: true,
          },
        },
        genre: {
          select: {
            id: true,
            genre: true,
          },
        },
        province: {
          select: {
            id: true,
            province: true,
          },
        },
        district: {
          select: {
            id: true,
            district: true,
          },
        },
        profileImage: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

userController.updateAvailability = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id); // ดึง ID ผู้ใช้จาก URL parameter
    const { isAvailable } = req.body; // ดึงสถานะ isAvailable จาก body ของ request

    // อัปเดตสถานะ isAvailable ของผู้ใช้ในฐานข้อมูล
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isAvailable },
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ส่งผลลัพธ์กลับไปให้ client
    res
      .status(200)
      .json({ message: "Availability status updated", user: updatedUser });
  } catch (error) {
    next(error); // ส่งข้อผิดพลาดไปยัง middleware ถัดไป
  }
};

userController.updateActiveStatus = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id); // ดึง ID ผู้ใช้จาก URL parameter
    const { isActive } = req.body; // ดึงสถานะ isActive จาก body ของ request

    // อัปเดตสถานะ isActive ของผู้ใช้ในฐานข้อมูล
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive },
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ส่งผลลัพธ์กลับไปให้ client
    res
      .status(200)
      .json({ message: "Active status updated", user: updatedUser });
  } catch (error) {
    next(error); // ส่งข้อผิดพลาดไปยัง middleware ถัดไป
  }
};

module.exports = userController; // ส่งออก userController เพื่อใช้งานในส่วนอื่นของโปรเจกต์
