const path = require("path");

const generateFullUrl = (req, res, next) => {
  // ฟังก์ชันสำหรับสร้าง URL แบบสมบูรณ์
  req.generateFullUrl = (filePath) => {
    return `${req.protocol}://${req.get("host")}${path.join(
      "/public",
      filePath
    )}`;
  };
  next();
};

module.exports = generateFullUrl;
