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
