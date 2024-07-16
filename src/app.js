const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path"); // นำเข้า path
const dotenv = require("dotenv");

dotenv.config(); // โหลด environment variables

const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/not-found");
const authRouter = require("./routes/auth-route");
const authenticate = require("./middlewares/authenticate");
const userRouter = require("./routes/user-route"); // นำเข้า userRouter
const reviewRoutes = require("./routes/review-route"); // นำเข้า review routes
const reportRoutes = require("./routes/report-route"); // นำเข้า report routes
const uploadRouter = require("./routes/upload-route");

// Log DATABASE_URL
// console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ตั้งค่าให้ Express ให้บริการไฟล์ในไดเรกทอรี 'public'
app.use("/public", express.static(path.join(__dirname, "..", "public")));

// เพิ่ม log เพื่อตรวจสอบเส้นทาง
console.log("Serving static files from:", path.join(__dirname, "..", "public"));

app.use("/auth", authRouter);
app.use("/users", userRouter); // เพิ่มการใช้งาน userRouter สำหรับการแก้ไขโปรไฟล์/ดึงข้อมูล
app.use("/api", uploadRouter); // เพิ่ม router สำหรับการอัปโหลดรูปโปรไฟล์
app.use("/api", reviewRoutes); // เพิ่มการใช้งาน review routes
app.use("/api", reportRoutes); // เพิ่มการใช้งาน report routes

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));

module.exports = app;
