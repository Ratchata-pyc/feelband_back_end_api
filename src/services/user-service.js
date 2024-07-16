const prisma = require("../model/prisma"); // นำเข้า prisma สำหรับการเชื่อมต่อและทำงานกับฐานข้อมูล

const userFiltered = {
  // กำหนดฟิลด์ที่จะดึงมาจากฐานข้อมูลเมื่อมีการร้องขอข้อมูลผู้ใช้
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  profileImage: true,
  createdAt: true,
  updatedAt: true,
};

const userService = {}; // สร้างวัตถุ userService เพื่อเก็บฟังก์ชันต่างๆ สำหรับการจัดการผู้ใช้

// ฟังก์ชันสำหรับสร้างผู้ใช้ใหม่
userService.createUser = (data) => prisma.user.create({ data });

// ฟังก์ชันสำหรับค้นหาผู้ใช้จากอีเมล
userService.findUserByEmail = (email) =>
  prisma.user.findFirst({
    where: {
      email: email,
    },
  });

// ฟังก์ชันสำหรับค้นหาผู้ใช้จาก ID
userService.findUserById = (userId) =>
  prisma.user.findUnique({
    where: { id: userId },
    include: {
      // รวมข้อมูลที่เกี่ยวข้องจากตารางอื่นๆ
      role: true,
      genre: true,
      province: true,
      district: true,
    },
  });

// ฟังก์ชันสำหรับอัปเดตข้อมูลผู้ใช้ตาม ID
userService.updateUserById = (data, userId) =>
  prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });

// ฟังก์ชันสำหรับอัปเดตภาพโปรไฟล์ใช้ตาม ID
userService.updateProfileImageById = (profileImage, id) => {
  console.log(profileImage);
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      profileImage,
    },
  });
};

module.exports = userService; // ส่งออก userService เพื่อใช้งานในส่วนอื่นของโปรเจกต์
