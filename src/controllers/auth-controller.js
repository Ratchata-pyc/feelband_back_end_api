const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const authController = {};

// ฟังก์ชันสำหรับการลงทะเบียนผู้ใช้ใหม่
authController.register = async (req, res, next) => {
  try {
    const data = req.input;
    const existUser = await userService.findUserByEmail(data.email);

    if (existUser) {
      return next(
        createError({
          message: "email already in use",
          field: "email",
          statusCode: 400,
        })
      );
    }

    data.password = await hashService.hash(data.password);
    await userService.createUser(data);
    res.status(201).json({ message: "user created" });
  } catch (err) {
    next(err);
  }
};

// ฟังก์ชันสำหรับการเข้าสู่ระบบผู้ใช้
authController.login = async (req, res, next) => {
  try {
    const existUser = await userService.findUserByEmail(req.input.email);

    if (!existUser) {
      return next(
        createError({
          message: "invalid credentials",
          statusCode: 400,
        })
      );
    }

    const isMatch = await hashService.compare(
      req.input.password,
      existUser.password
    );

    if (!isMatch) {
      return next(
        createError({
          message: "invalid credentials",
          statusCode: 400,
        })
      );
    }

    if (!existUser.isActive) {
      return res
        .status(403)
        .json({ message: "You are banned. Please contact the admin." });
    }

    const accessToken = jwtService.sign({
      id: existUser.id,
      isAdmin: existUser.isAdmin,
      isActive: existUser.isActive,
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ปัจจุบัน
authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

// ฟังก์ชันสำหรับ edit profile
authController.updateUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    // ลบข้อมูล isAdmin เพื่อป้องกันการอัปเดต
    delete data.isAdmin;

    const updatedUser = await userService.updateUserById(data, userId);

    if (!updatedUser) {
      return next(
        createError({
          message: "User not found",
          statusCode: 404,
        })
      );
    }

    // ลบข้อมูล password ก่อนส่งผลลัพธ์กลับไป
    delete updatedUser.password;
    delete updatedUser.isAdmin;

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports = authController;
