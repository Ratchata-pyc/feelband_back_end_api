const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createError = require("../utils/create-error"); // นำเข้า createError สำหรับการสร้างข้อผิดพลาด

const reviewController = {}; // สร้างวัตถุ reviewController เพื่อเก็บฟังก์ชันต่างๆ สำหรับการจัดการรีวิว

// ฟังก์ชันสำหรับการสร้างรีวิวใหม่
reviewController.createReview = async (req, res, next) => {
  const senderId = req.user.id; // ดึง senderId จาก token
  const { receiverId, content } = req.body; // รับค่าจาก request body

  // ล็อกข้อมูลก่อนที่จะทำการส่งคำขอ
  console.log("Creating review with data:", {
    senderId,
    receiverId,
    content,
  });

  // ตรวจสอบว่ามีค่าทั้งหมดหรือไม่
  if (!receiverId || !content) {
    return res
      .status(400)
      .json({ error: "receiverId and content are required" });
  }

  // ตรวจสอบว่า senderId และ receiverId ไม่เหมือนกัน
  if (senderId === receiverId) {
    return res.status(400).json({ error: "You cannot review yourself" });
  }

  try {
    // สร้างรีวิวใหม่ในฐานข้อมูลโดยใช้ Prisma
    const review = await prisma.review.create({
      data: {
        senderId, // ID ของผู้ส่งรีวิวจาก token
        receiverId, // ID ของผู้รับรีวิว
        content, // เนื้อหาของรีวิว
      },
    });
    res.status(201).json(review); // ส่งข้อมูลรีวิวที่สร้างแล้วกลับไปที่ client
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Failed to create review" }); // ส่งข้อผิดพลาดกลับไปที่ client ถ้ามีปัญหาในการสร้างรีวิว
  }
};

// ฟังก์ชันสำหรับการดึงรีวิวที่ userId เป็น receiver
reviewController.getReviewsByUserId = async (req, res, next) => {
  const userId = parseInt(req.params.userId); // ดึง userId จาก URL parameter

  // ล็อกข้อมูลก่อนที่จะทำการดึงรีวิว
  console.log("Retrieving reviews for userId:", userId);

  try {
    // ดึงรีวิวจากฐานข้อมูลโดยใช้ Prisma ที่ userId เป็น receiver
    const reviews = await prisma.review.findMany({
      where: {
        receiverId: userId,
      },
    });
    res.status(200).json(reviews); // ส่งข้อมูลรีวิวกลับไปที่ client
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    res.status(500).json({ error: "Failed to retrieve reviews" }); // ส่งข้อผิดพลาดกลับไปที่ client ถ้ามีปัญหาในการดึงรีวิว
  }
};

module.exports = reviewController; // ส่งออก reviewController เพื่อใช้งานในส่วนอื่นของโปรเจกต์
