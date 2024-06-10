const Joi = require("joi"); // นำเข้าไลบรารี Joi สำหรับการตรวจสอบข้อมูล (validation)

exports.registerSchema = Joi.object({
  // กำหนด schema สำหรับการลงทะเบียนผู้ใช้
  firstName: Joi.string().required().trim(), // firstName ต้องเป็นข้อความ, ห้ามว่าง, และตัดช่องว่างที่อยู่ต้นและท้ายออก
  lastName: Joi.string().required().trim(), // lastName ต้องเป็นข้อความ, ห้ามว่าง, และตัดช่องว่างที่อยู่ต้นและท้ายออก
  email: Joi.string().email({ tlds: false }).required(), // email ต้องเป็นอีเมลที่ถูกต้อง, ไม่ตรวจสอบ tlds, และห้ามว่าง
  password: Joi.string()
    .required() // password ห้ามว่าง
    .pattern(/^[a-zA-Z0-9]{6,}$/), // password ต้องมีความยาวอย่างน้อย 6 ตัวอักษรและประกอบด้วยตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
  // confirmPassword ห้ามว่าง, ต้องตรงกับ password และจะถูกลบออกจากผลลัพธ์หลังจากการตรวจสอบ
});

exports.loginSchema = Joi.object({
  // กำหนด schema สำหรับการเข้าสู่ระบบ
  email: Joi.string().email({ tlds: false }).required(), // email ต้องเป็นอีเมลที่ถูกต้อง, ไม่ตรวจสอบ tlds, และห้ามว่าง
  password: Joi.string().required(), // password ห้ามว่าง
});
