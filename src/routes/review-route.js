const express = require("express");
const reviewController = require("../controllers/review-controller"); // นำเข้า reviewController
const authenticate = require("../middlewares/authenticate"); // นำเข้า middleware สำหรับการยืนยันตัวตน

const reviewRouter = express.Router();

// Route สำหรับการสร้างรีวิวใหม่
reviewRouter.post("/reviews", authenticate, reviewController.createReview);

// Route สำหรับการดึงรีวิวจาก userId
reviewRouter.get("/reviews/user/:userId", reviewController.getReviewsByUserId);

// Route สำหรับการแก้ไขรีวิว
reviewRouter.put("/reviews/:id", authenticate, reviewController.updateReview);

// Route สำหรับการลบรีวิว
reviewRouter.delete(
  "/reviews/:id",
  authenticate,
  reviewController.deleteReview
);

module.exports = reviewRouter; // ส่งออก router เพื่อให้สามารถนำไปใช้ในส่วนอื่นของแอปได้
