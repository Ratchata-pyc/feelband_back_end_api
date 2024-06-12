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
