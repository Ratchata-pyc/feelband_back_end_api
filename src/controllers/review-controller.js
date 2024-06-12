const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createError = require("../utils/create-error");

const reviewController = {};

// สร้างรีวิวใหม่
reviewController.createReview = async (req, res, next) => {
  const senderId = req.user.id;
  const { receiverId, content } = req.body;

  console.log("Creating review with data:", {
    senderId,
    receiverId,
    content,
  });

  if (!receiverId || !content) {
    return res
      .status(400)
      .json({ error: "receiverId and content are required" });
  }

  if (senderId === receiverId) {
    return res.status(400).json({ error: "You cannot review yourself" });
  }

  try {
    const review = await prisma.review.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });
    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

// ดึงข้อมูลรีวิวตาม userId ของผู้รับ
reviewController.getReviewsByUserId = async (req, res, next) => {
  const userId = parseInt(req.params.userId);

  console.log("Retrieving reviews for userId:", userId);

  try {
    const reviews = await prisma.review.findMany({
      where: {
        receiverId: userId,
      },
      include: {
        senderReview: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const formattedReviews = reviews.map((review) => ({
      id: review.id,
      content: review.content,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      senderId: review.senderId,
      receiverId: review.receiverId,
      senderFirstName: review.senderReview.firstName,
      senderLastName: review.senderReview.lastName,
    }));

    res.status(200).json(formattedReviews);
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    res.status(500).json({ error: "Failed to retrieve reviews" });
  }
};

// แก้ไขรีวิว
reviewController.updateReview = async (req, res, next) => {
  const reviewId = parseInt(req.params.id);
  const { content } = req.body;
  const userId = req.user.id;

  console.log("Updating review with data:", {
    reviewId,
    content,
    userId,
  });

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (existingReview.senderId !== userId) {
      return res
        .status(403)
        .json({ error: "You can only edit your own reviews" });
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { content },
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
};

reviewController.deleteReview = async (req, res, next) => {
  const reviewId = parseInt(req.params.id);
  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;

  console.log("Deleting review with data:", {
    reviewId,
    userId,
    isAdmin,
  });

  try {
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (!isAdmin && existingReview.senderId !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own reviews" });
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
};

module.exports = reviewController;
