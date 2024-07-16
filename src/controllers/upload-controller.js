// const uploadService = require("../services/upload-service");
// const userService = require("../services/user-service");

// const uploadController = {};

// uploadController.uploadProfileImage = async (req, res, next) => {
//   try {
//     if (!req?.file) {
//       return res.status(400).json({ message: "No file uploaded" }); // ส่งคำตอบเมื่อไม่มีการอัปโหลดไฟล์
//     }

//     if (req.file) {
//       image = await uploadService.upload(req.file.path);
//     }

//     res
//       .status(200)
//       .json({ message: "File uploaded successfully", filePath: image }); // ส่งคำตอบสำเร็จพร้อม URL ของไฟล์ที่อัปโหลด
//   } catch (error) {
//     console.error("Error upload profileImage:", error);
//     res.status(500).json({ error: "Failed to upload profileImage" });
//   }
// };

// module.exports = uploadController;

const uploadService = require("../services/upload-service");
const userService = require("../services/user-service");

const uploadController = {};

uploadController.uploadProfileImage = async (req, res, next) => {
  try {
    if (!req?.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const image = await uploadService.upload(req.file.path);
    console.log("here:", image);
    res
      .status(200)
      .json({ message: "File uploaded successfully", filePath: image });
  } catch (error) {
    console.error("Error upload profileImage:", error);
    res.status(500).json({ error: "Failed to upload profileImage" });
  }
};

module.exports = uploadController;
