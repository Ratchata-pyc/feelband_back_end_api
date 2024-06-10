const hashService = require("../services/hash-service"); // นำเข้า hashService สำหรับการแฮชและตรวจสอบรหัสผ่าน
const jwtService = require("../services/jwt-service"); // นำเข้า jwtService สำหรับการสร้างและตรวจสอบ JSON Web Token
const userService = require("../services/user-service"); // นำเข้า userService สำหรับการจัดการข้อมูลผู้ใช้ในฐานข้อมูล
const createError = require("../utils/create-error"); // นำเข้า createError สำหรับการสร้างข้อผิดพลาด

const authController = {}; // สร้างวัตถุ authController เพื่อเก็บฟังก์ชันต่างๆ สำหรับการยืนยันตัวตน

// ฟังก์ชันสำหรับการลงทะเบียนผู้ใช้ใหม่
authController.register = async (req, res, next) => {
  try {
    const data = req.input; // ดึงข้อมูลที่ผู้ใช้ส่งมา
    const existUser = await userService.findUserByEmail(data.email); // ตรวจสอบว่ามีผู้ใช้ที่ใช้อีเมลนี้อยู่แล้วหรือไม่

    if (existUser) {
      createError({
        message: "email already in use", // ถ้ามีผู้ใช้ที่ใช้อีเมลนี้อยู่แล้ว สร้างข้อผิดพลาด
        field: "email",
        statusCode: 400,
      });
    }

    data.password = await hashService.hash(data.password); // แฮชรหัสผ่านของผู้ใช้
    await userService.createUser(data); // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    res.status(201).json({ message: "user created" }); // ส่งสถานะและข้อความกลับไปให้ client
  } catch (err) {
    next(err); // ส่งข้อผิดพลาดไปยัง middleware ถัดไป
  }
};

// ฟังก์ชันสำหรับการเข้าสู่ระบบผู้ใช้
authController.login = async (req, res, next) => {
  try {
    const existUser = await userService.findUserByEmail(req.input.email); // ค้นหาผู้ใช้จากอีเมล

    if (!existUser) {
      createError({
        message: "invalid credentials", // ถ้าไม่พบผู้ใช้ สร้างข้อผิดพลาด
        statusCode: 400,
      });
    }

    const isMatch = await hashService.compare(
      req.input.password,
      existUser.password
    ); // เปรียบเทียบรหัสผ่านที่ผู้ใช้ส่งมากับรหัสผ่านที่แฮชแล้วในฐานข้อมูล

    if (!isMatch) {
      createError({
        message: "invalid credentials", // ถ้ารหัสผ่านไม่ตรงกัน สร้างข้อผิดพลาด
        statusCode: 400,
      });
    }

    const accessToken = jwtService.sign({
      id: existUser.id,
      isAdmin: existUser.isAdmin,
    }); // สร้าง JSON Web Token สำหรับผู้ใช้ที่เข้าสู่ระบบสำเร็จ
    res.status(200).json({ accessToken }); // ส่ง token กลับไปให้ client
  } catch (err) {
    next(err); // ส่งข้อผิดพลาดไปยัง middleware ถัดไป
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ปัจจุบัน
authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user }); // ส่งข้อมูลผู้ใช้ที่ถูกยืนยันตัวตนแล้วกลับไปให้ client
};

module.exports = authController; // ส่งออก authController เพื่อใช้งานในส่วนอื่นของโปรเจกต์
