// const express = require("express");
// const router = express.Router();
// const reportController = require("../controllers/report-controller"); // นำเข้า reportController
// const authenticate = require("../middlewares/authenticate"); // นำเข้า middleware สำหรับการยืนยันตัวตน

// const reportRouter = express.Router();

// // Route สำหรับการสร้างรายงานใหม่
// reportRouter.post("/reports", authenticate, reportController.createReport);

// // Route สำหรับการดึงรายงานที่ userId เป็น receiver
// reportRouter.get("/reports/user/:userId", reportController.getReportsByUserId);

// module.exports = reportRouter; // ส่งออก router เพื่อให้สามารถนำไปใช้ในส่วนอื่นของแอปได้

const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report-controller");
const authenticate = require("../middlewares/authenticate");

const reportRouter = express.Router();

reportRouter.post("/reports", authenticate, reportController.createReport);
reportRouter.get("/reports", authenticate, reportController.getAllReports);
reportRouter.delete(
  "/reports/:id",
  authenticate,
  reportController.deleteReport
); // Route สำหรับลบ

module.exports = reportRouter;
