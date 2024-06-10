// const express = require("express");
// const userService = require("../services/user-service");
// const authenticate = require("../middlewares/authenticate");
// const router = express.Router();

// router.get("/:id", async (req, res) => {
//   const userId = parseInt(req.params.id);

//   try {
//     const user = await userService.findUserById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.put("/edit", authenticate, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const data = req.body;
//     const updatedUser = await userService.updateUserById(data, userId);
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = userRouter;

// const express = require("express");

// // const userController = require("../controllers/user-controller");

// const userRouter = express.Router();

// // userRouter.get("/:profileId", userController.getProfileUser);

// module.exports = userRouter;
