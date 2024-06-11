require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/not-found");
const authRouter = require("./routes/auth-route");
const authenticate = require("./middlewares/authenticate");
const userRouter = require("./routes/user-route"); // นำเข้า userRouter
const reviewRoutes = require("../src/routes/review-route"); // นำเข้า review routes
const reportRoutes = require("../src/routes/report-route"); // นำเข้า report routes
const uploadRouter = require("./middlewares/upload");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter); // เพิ่มการใช้งาน userRoutersสำหรับ editprofile/get
app.use("/api", uploadRouter);
app.use("/api", reviewRoutes); // เพิ่มการใช้งาน review routes
app.use("/api", reportRoutes); // เพิ่มการใช้งาน report routes

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
