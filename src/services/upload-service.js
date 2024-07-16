// const cloudinary = require("../config/cloudinary");

// const uploadService = {};

// uploadService.upload = async (path) => {
//   const { secure_url } = await cloudinary.uploader.upload(path);
//   return secure_url;
// };

// module.exports = uploadService;
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const util = require("util");
const dotenv = require("dotenv");

dotenv.config(); // โหลด environment variables

const unlinkFile = util.promisify(fs.unlink); // สร้างฟังก์ชันสำหรับลบไฟล์แบบ async

const uploadService = {};

uploadService.upload = async (path) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(path);
    // await unlinkFile(path); // ลบไฟล์หลังจากอัปโหลดสำเร็จ
    return secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

module.exports = uploadService;
