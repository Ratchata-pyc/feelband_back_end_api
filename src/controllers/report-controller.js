// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// const createError = require("../utils/create-error"); // นำเข้า createError สำหรับการสร้างข้อผิดพลาด

// const reportController = {}; // สร้างวัตถุ reportController เพื่อเก็บฟังก์ชันต่างๆ สำหรับการจัดการรายงาน

// // ฟังก์ชันสำหรับการสร้างรายงานใหม่
// reportController.createReport = async (req, res, next) => {
//   const senderId = req.user.id; // ดึง senderId จาก token
//   const { receiverId, complaint } = req.body; // รับค่าจาก request body

//   // ล็อกข้อมูลก่อนที่จะทำการส่งคำขอ
//   console.log("Creating report with data:", {
//     senderId,
//     receiverId,
//     complaint,
//   });

//   // ตรวจสอบว่ามีค่าทั้งหมดหรือไม่
//   if (!receiverId || !complaint) {
//     return res
//       .status(400)
//       .json({ error: "receiverId and complaint are required" });
//   }

//   // ตรวจสอบว่า senderId และ receiverId ไม่เหมือนกัน
//   if (senderId === receiverId) {
//     return res.status(400).json({ error: "You cannot report yourself" });
//   }

//   try {
//     // สร้างรายงานใหม่ในฐานข้อมูลโดยใช้ Prisma
//     const report = await prisma.report.create({
//       data: {
//         senderId, // ID ของผู้ส่งรายงานจาก token
//         receiverId, // ID ของผู้รับรายงาน
//         complaint, // เนื้อหาของรายงาน
//       },
//     });
//     res.status(201).json(report); // ส่งข้อมูลรายงานที่สร้างแล้วกลับไปที่ client
//   } catch (error) {
//     console.error("Error creating report:", error);
//     res.status(500).json({ error: "Failed to create report" }); // ส่งข้อผิดพลาดกลับไปที่ client ถ้ามีปัญหาในการสร้างรายงาน
//   }
// };

// // ฟังก์ชันสำหรับการดึงรายงานที่ userId เป็น receiver
// reportController.getReportsByUserId = async (req, res, next) => {
//   const userId = parseInt(req.params.userId); // ดึง userId จาก URL parameter

//   // ล็อกข้อมูลก่อนที่จะทำการดึงรายงาน
//   console.log("Retrieving reports for userId:", userId);

//   try {
//     // ดึงรายงานจากฐานข้อมูลโดยใช้ Prisma ที่ userId เป็น receiver
//     const reports = await prisma.report.findMany({
//       where: {
//         receiverId: userId,
//       },
//     });
//     res.status(200).json(reports); // ส่งข้อมูลรายงานกลับไปที่ client
//   } catch (error) {
//     console.error("Error retrieving reports:", error);
//     res.status(500).json({ error: "Failed to retrieve reports" }); // ส่งข้อผิดพลาดกลับไปที่ client ถ้ามีปัญหาในการดึงรายงาน
//   }
// };

// module.exports = reportController; // ส่งออก reportController เพื่อใช้งานในส่วนอื่นของโปรเจกต์

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createError = require("../utils/create-error");

const reportController = {};

reportController.createReport = async (req, res, next) => {
  const senderId = req.user.id;
  const { receiverId, complaint } = req.body;

  console.log("Creating report with data:", {
    senderId,
    receiverId,
    complaint,
  });

  if (!receiverId || !complaint) {
    return res
      .status(400)
      .json({ error: "receiverId and complaint are required" });
  }

  if (senderId === receiverId) {
    return res.status(400).json({ error: "You cannot report yourself" });
  }

  try {
    const report = await prisma.report.create({
      data: {
        senderId,
        receiverId,
        complaint,
      },
    });
    res.status(201).json(report);
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Failed to create report" });
  }
};

// ฟังก์ชันสำหรับการลบรายงาน
reportController.deleteReport = async (req, res, next) => {
  const reportId = parseInt(req.params.id);

  console.log("Deleting report with id:", reportId);

  try {
    await prisma.report.delete({
      where: { id: reportId },
    });
    res.status(204).json({}); // No Content
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ error: "Failed to delete report" });
  }
};

reportController.getAllReports = async (req, res, next) => {
  console.log("Retrieving all reports");

  try {
    const reports = await prisma.report.findMany({
      include: {
        senderReport: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
            profileImage: true,
          },
        },
        receiverReport: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
            profileImage: true,
          },
        },
      },
    });
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error retrieving all reports:", error);
    res.status(500).json({ error: "Failed to retrieve all reports" });
  }
};

module.exports = reportController;
