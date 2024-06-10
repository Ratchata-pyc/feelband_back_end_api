const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ข้อมูลบทบาทต่าง ๆ
const roles = [
  { id: 1, role: "Guitar" },
  { id: 2, role: "Bass" },
  { id: 3, role: "Piano" },
  { id: 4, role: "Voice" },
  { id: 5, role: "Drum" },
  { id: 6, role: "Saxophone" },
];

// ข้อมูลแนวดนตรีต่าง ๆ
const genres = [
  { id: 1, genre: "Pop" },
  { id: 2, genre: "Rock" },
  { id: 3, genre: "Jazz" },
  { id: 4, genre: "Blues" },
];

// ข้อมูลจังหวัดต่าง ๆ
const provinces = [
  { id: 1, province: "กรุงเทพมหานคร" },
  { id: 2, province: "เชียงใหม่" },
  { id: 3, province: "ภูเก็ต" },
  { id: 4, province: "ชลบุรี" },
];

// ข้อมูลอำเภอต่าง ๆ แยกตามจังหวัด
const districts = {
  1: [
    { id: 1, district: "บางกะปิ" },
    { id: 2, district: "ห้วยขวาง" },
  ],
  2: [
    { id: 3, district: "เมืองเชียงใหม่" },
    { id: 4, district: "หางดง" },
  ],
  3: [
    { id: 5, district: "เมืองภูเก็ต" },
    { id: 6, district: "กะทู้" },
  ],
  4: [
    { id: 7, district: "เมืองชลบุรี" },
    { id: 8, district: "บางละมุง" },
  ],
};

const run = async () => {
  // ลบข้อมูลเก่าทั้งหมด
  await prisma.review.deleteMany({});
  await prisma.report.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.districtList.deleteMany({});
  await prisma.provinceList.deleteMany({});
  await prisma.roleList.deleteMany({});
  await prisma.genreList.deleteMany({});

  // เพิ่มข้อมูลบทบาท
  await prisma.roleList.createMany({
    data: roles,
  });

  // เพิ่มข้อมูลแนวดนตรี
  await prisma.genreList.createMany({
    data: genres,
  });

  // เพิ่มข้อมูลจังหวัด
  await prisma.provinceList.createMany({
    data: provinces,
  });

  // เพิ่มข้อมูลอำเภอ
  for (const provinceId in districts) {
    const districtData = districts[provinceId].map((district) => ({
      id: district.id,
      district: district.district,
      provinceId: parseInt(provinceId),
    }));
    await prisma.districtList.createMany({ data: districtData });
  }
};

run()
  .then(async () => {
    await prisma.$disconnect(); // ปิดการเชื่อมต่อฐานข้อมูลหลังจากทำงานเสร็จสิ้น
  })
  .catch(async (e) => {
    console.error(e); // แสดงข้อผิดพลาดถ้ามี
    await prisma.$disconnect(); // ปิดการเชื่อมต่อฐานข้อมูลในกรณีที่เกิดข้อผิดพลาด
    process.exit(1); // ออกจากโปรแกรมด้วยสถานะผิดพลาด
  });
