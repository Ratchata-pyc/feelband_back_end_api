// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// // ข้อมูลบทบาทต่าง ๆ
// const roles = [
//   { id: 1, role: "Guitar" },
//   { id: 2, role: "Bass" },
//   { id: 3, role: "Piano" },
//   { id: 4, role: "Voice" },
//   { id: 5, role: "Drum" },
//   { id: 6, role: "Saxophone" },
// ];

// // ข้อมูลแนวดนตรีต่าง ๆ
// const genres = [
//   { id: 1, genre: "Pop" },
//   { id: 2, genre: "Rock" },
//   { id: 3, genre: "Jazz" },
//   { id: 4, genre: "Blues" },
// ];

// // ข้อมูลจังหวัดต่าง ๆ
// const provinces = [
//   { id: 1, province: "กรุงเทพมหานคร" },
//   { id: 2, province: "เชียงใหม่" },
//   { id: 3, province: "ภูเก็ต" },
//   { id: 4, province: "ชลบุรี" },
// ];

// // ข้อมูลอำเภอต่าง ๆ แยกตามจังหวัด
// const districts = {
//   1: [
//     { id: 1, district: "บางกะปิ" },
//     { id: 2, district: "ห้วยขวาง" },
//   ],
//   2: [
//     { id: 3, district: "เมืองเชียงใหม่" },
//     { id: 4, district: "หางดง" },
//   ],
//   3: [
//     { id: 5, district: "เมืองภูเก็ต" },
//     { id: 6, district: "กะทู้" },
//   ],
//   4: [
//     { id: 7, district: "เมืองชลบุรี" },
//     { id: 8, district: "บางละมุง" },
//   ],
// };

// const run = async () => {
//   // ลบข้อมูลเก่าทั้งหมด
//   await prisma.review.deleteMany({});
//   await prisma.report.deleteMany({});
//   await prisma.user.deleteMany({});
//   await prisma.districtList.deleteMany({});
//   await prisma.provinceList.deleteMany({});
//   await prisma.roleList.deleteMany({});
//   await prisma.genreList.deleteMany({});

//   // เพิ่มข้อมูลบทบาท
//   await prisma.roleList.createMany({
//     data: roles,
//   });

//   // เพิ่มข้อมูลแนวดนตรี
//   await prisma.genreList.createMany({
//     data: genres,
//   });

//   // เพิ่มข้อมูลจังหวัด
//   await prisma.provinceList.createMany({
//     data: provinces,
//   });

//   // เพิ่มข้อมูลอำเภอ
//   for (const provinceId in districts) {
//     const districtData = districts[provinceId].map((district) => ({
//       id: district.id,
//       district: district.district,
//       provinceId: parseInt(provinceId),
//     }));
//     await prisma.districtList.createMany({ data: districtData });
//   }
// };

// run()
//   .then(async () => {
//     await prisma.$disconnect(); // ปิดการเชื่อมต่อฐานข้อมูลหลังจากทำงานเสร็จสิ้น
//   })
//   .catch(async (e) => {
//     console.error(e); // แสดงข้อผิดพลาดถ้ามี
//     await prisma.$disconnect(); // ปิดการเชื่อมต่อฐานข้อมูลในกรณีที่เกิดข้อผิดพลาด
//     process.exit(1); // ออกจากโปรแกรมด้วยสถานะผิดพลาด
//   });

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const firstNames = [
//   "สมชาย",
//   "สมหญิง",
//   "สมทรง",
//   "สมศักดิ์",
//   "สมใจ",
//   "สมบูรณ์",
//   "สมบัติ",
//   "สมสุข",
//   "สมหวัง",
//   "สมดุล",
// ];
// const lastNames = [
//   "รัตนกุล",
//   "วัฒนาศิลป์",
//   "ศิริชัย",
//   "วงศ์ไทย",
//   "บุญญานันท์",
//   "ทิพย์วรรณ",
//   "พงษ์พันธุ์",
//   "เจริญสุข",
//   "ประทุมทอง",
//   "อัศวิน",
// ];

// // ข้อมูลบทบาทต่าง ๆ
// const roles = [
//   { id: 1, role: "Guitar" },
//   { id: 2, role: "Bass" },
//   { id: 3, role: "Piano" },
//   { id: 4, role: "Voice" },
//   { id: 5, role: "Drum" },
//   { id: 6, role: "Saxophone" },
// ];

// // ข้อมูลแนวดนตรีต่าง ๆ
// const genres = [
//   { id: 1, genre: "Pop" },
//   { id: 2, genre: "Rock" },
//   { id: 3, genre: "Jazz" },
//   { id: 4, genre: "Blues" },
// ];

// // ข้อมูลจังหวัดต่าง ๆ
// const provinces = [
//   { id: 1, province: "กรุงเทพมหานคร" },
//   { id: 2, province: "เชียงใหม่" },
//   { id: 3, province: "ภูเก็ต" },
//   { id: 4, province: "ชลบุรี" },
// ];

// // ข้อมูลอำเภอต่าง ๆ แยกตามจังหวัด
// const districts = {
//   1: [
//     { id: 1, district: "บางกะปิ" },
//     { id: 2, district: "ห้วยขวาง" },
//   ],
//   2: [
//     { id: 3, district: "เมืองเชียงใหม่" },
//     { id: 4, district: "หางดง" },
//   ],
//   3: [
//     { id: 5, district: "เมืองภูเก็ต" },
//     { id: 6, district: "กะทู้" },
//   ],
//   4: [
//     { id: 7, district: "เมืองชลบุรี" },
//     { id: 8, district: "บางละมุง" },
//   ],
// };

// // ข้อมูลผู้ใช้
// const users = Array.from({ length: 50 }, (_, i) => ({
//   firstName: firstNames[i % firstNames.length],
//   lastName: lastNames[i % lastNames.length],
//   email: `user${i + 1}@example.com`,
//   password: "password", // แนะนำให้ทำการแฮชพาสเวิร์ดก่อนใช้งานจริง
//   isAdmin: false, // ตั้งค่าเป็น false สำหรับทุกคน
//   isActive: true,
//   isAvailable: false, // ตั้งค่าเป็น false สำหรับทุกคน
//   roleId: Math.floor(Math.random() * roles.length) + 1,
//   genreId: Math.floor(Math.random() * genres.length) + 1,
//   budget: (Math.floor(Math.random() * 10000) + 1000).toString(),
//   provinceId: Math.floor(Math.random() * provinces.length) + 1,
//   districtId: Math.floor(Math.random() * 2) + 1, // ตั้งค่าให้เป็นอำเภอแรกหรืออำเภอที่สองของจังหวัดที่เลือก
//   contact: `089-${Math.floor(1000000 + Math.random() * 9000000)}`,
//   description: `Description for user ${i + 1}`,
// }));

// // ข้อมูลรีวิว
// const reviews = Array.from({ length: 20 }, (_, i) => ({
//   senderId: Math.floor(Math.random() * 45) + 6, // ตั้งค่าให้ sender เป็นผู้ใช้คนอื่น (ไม่ใช่ user 1-5)
//   receiverId: Math.floor(Math.random() * 5) + 1, // ตั้งค่าให้ receiver เป็น user 1-5
//   content: `Review content ${i + 1}`,
// }));

// // ข้อมูลรายงาน
// const reports = Array.from({ length: 10 }, (_, i) => ({
//   senderId: Math.floor(Math.random() * 45) + 6, // ตั้งค่าให้ sender เป็นผู้ใช้คนอื่น (ไม่ใช่ user 1-5)
//   receiverId: Math.floor(Math.random() * 50) + 1, // ตั้งค่าให้ receiver เป็น user ใดก็ได้
//   complaint: `Complaint content ${i + 1}`,
// }));

// const run = async () => {
//   // ลบข้อมูลเก่าทั้งหมด
//   await prisma.review.deleteMany({});
//   await prisma.report.deleteMany({});
//   await prisma.user.deleteMany({});
//   await prisma.districtList.deleteMany({});
//   await prisma.provinceList.deleteMany({});
//   await prisma.roleList.deleteMany({});
//   await prisma.genreList.deleteMany({});

//   // เพิ่มข้อมูลบทบาท
//   await prisma.roleList.createMany({
//     data: roles,
//   });

//   // เพิ่มข้อมูลแนวดนตรี
//   await prisma.genreList.createMany({
//     data: genres,
//   });

//   // เพิ่มข้อมูลจังหวัด
//   await prisma.provinceList.createMany({
//     data: provinces,
//   });

//   // เพิ่มข้อมูลอำเภอ
//   for (const provinceId in districts) {
//     const districtData = districts[provinceId].map((district) => ({
//       id: district.id,
//       district: district.district,
//       provinceId: parseInt(provinceId),
//     }));
//     await prisma.districtList.createMany({ data: districtData });
//   }

//   // เพิ่มข้อมูลผู้ใช้
//   await prisma.user.createMany({
//     data: users,
//   });

//   // เพิ่มข้อมูลรีวิว
//   await prisma.review.createMany({
//     data: reviews,
//   });

//   // เพิ่มข้อมูลรายงาน
//   await prisma.report.createMany({
//     data: reports,
//   });
// };

// run()
//   .then(async () => {
//     await prisma.$disconnect(); // ปิดการเชื่อมต่อฐานข้อมูลหลังจากทำงานเสร็จสิ้น
//   })
//   .catch(async (e) => {
//     console.error(e); // แสดงข้อผิดพลาดถ้ามี
//     await prisma.$disconnect(); // ปิดการเชื่อมต่อฐานข้อมูลในกรณีที่เกิดข้อผิดพลาด
//     process.exit(1); // ออกจากโปรแกรมด้วยสถานะผิดพลาด
//   });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const firstNames = [
  "Paul",
  "John",
  "George",
  "Ringo",
  "Freddie",
  "Elton",
  "David",
  "Mick",
  "Keith",
  "Brian",
  "Roger",
  "Jim",
  "Kurt",
  "Axl",
  "Slash",
  "Bono",
  "Edge",
  "Adam",
  "Larry",
  "Bruce",
  "Eddie",
  "Robert",
  "Jimmy",
  "John",
  "Ian",
  "Angus",
  "Malcolm",
  "Phil",
  "Steven",
  "Joe",
  "James",
  "Lars",
  "Kirk",
  "Cliff",
  "Lemmy",
  "Ozzy",
  "Tony",
  "Geezer",
  "Bill",
  "Ronnie",
  "Tom",
  "Trent",
  "Billy",
  "Corgan",
  "Chris",
  "Cornell",
  "Eddie",
  "Vedder",
  "Layne",
  "Staley",
];
const lastNames = [
  "McCartney",
  "Lennon",
  "Harrison",
  "Starr",
  "Mercury",
  "John",
  "Bowie",
  "Jagger",
  "Richards",
  "May",
  "Taylor",
  "Morrison",
  "Cobain",
  "Rose",
  "Hudson",
  "Vox",
  "Evans",
  "Clayton",
  "Mullen",
  "Springsteen",
  "Vedder",
  "Plant",
  "Page",
  "Bonham",
  "Curtis",
  "Young",
  "Young",
  "Rudd",
  "Tyler",
  "Perry",
  "Hetfield",
  "Ulrich",
  "Hammett",
  "Burton",
  "Kilmister",
  "Osbourne",
  "Iommi",
  "Butler",
  "Ward",
  "Dio",
  "Petty",
  "Reznor",
  "Corgan",
  "Chamberlin",
  "Cornell",
  "Staley",
  "Vedder",
  "Cobain",
  "Staley",
  "Cantrell",
];

const roleIds = [1, 2, 3, 4, 5, 6];
const genreIds = [1, 2, 3, 4];

const provinces = [
  { id: 1, province: "กรุงเทพมหานคร" },
  { id: 2, province: "เชียงใหม่" },
  { id: 3, province: "ภูเก็ต" },
  { id: 4, province: "ชลบุรี" },
];

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

const users = Array.from({ length: 50 }, (_, i) => ({
  firstName: firstNames[i % firstNames.length],
  lastName: lastNames[i % lastNames.length],
  email: `musician${i + 1}@example.com`,
  password: "password", // You should hash the password before using it in production
  isAdmin: false,
  isActive: true,
  isAvailable: false,
  roleId: roleIds[Math.floor(Math.random() * roleIds.length)],
  genreId: genreIds[Math.floor(Math.random() * genreIds.length)],
  budget: ((Math.floor(Math.random() * 10) + 1) * 1000).toString(), // Rounded budget values
  provinceId: provinces[Math.floor(Math.random() * provinces.length)].id,
  districtId:
    districts[provinces[Math.floor(Math.random() * provinces.length)].id][
      Math.floor(Math.random() * 2)
    ].id,
  contact: `line_id_${i + 1}`,
  description: `Description for musician ${i + 1}`,
}));

const positiveReviews = [
  "Excellent performance, very professional!",
  "Amazing talent, would hire again!",
  "Great musician, really enjoyed the show.",
  "Highly skilled and very friendly.",
  "Outstanding performance, highly recommended!",
];

const negativeReviews = [
  "Poor performance, not as expected.",
  "Unprofessional behavior, would not hire again.",
  "Disappointing experience, lacked preparation.",
  "Not up to the mark, needs improvement.",
  "Below average performance, not recommended.",
];

const reviews = Array.from({ length: 20 }, (_, i) => {
  const isPositive = Math.random() > 0.5;
  return {
    senderId: Math.floor(Math.random() * 45) + 6, // Sender from users 6-50
    receiverId: Math.floor(Math.random() * 5) + 1, // Receiver from users 1-5
    content: isPositive
      ? positiveReviews[Math.floor(Math.random() * positiveReviews.length)]
      : negativeReviews[Math.floor(Math.random() * negativeReviews.length)],
  };
});

const reports = Array.from({ length: 10 }, (_, i) => ({
  senderId: Math.floor(Math.random() * 45) + 6, // Sender from users 6-50
  receiverId: Math.floor(Math.random() * 50) + 1, // Receiver from users 1-50
  complaint: `Complaint content ${i + 1}`,
}));

const run = async () => {
  // Clear existing data
  await prisma.review.deleteMany({});
  await prisma.report.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.districtList.deleteMany({});
  await prisma.provinceList.deleteMany({});
  await prisma.roleList.deleteMany({});
  await prisma.genreList.deleteMany({});

  // Seed roles
  const roles = [
    { id: 1, role: "Guitar" },
    { id: 2, role: "Bass" },
    { id: 3, role: "Piano" },
    { id: 4, role: "Voice" },
    { id: 5, role: "Drum" },
    { id: 6, role: "Saxophone" },
  ];
  await prisma.roleList.createMany({ data: roles });

  // Seed genres
  const genres = [
    { id: 1, genre: "Pop" },
    { id: 2, genre: "Rock" },
    { id: 3, genre: "Jazz" },
    { id: 4, genre: "Blues" },
  ];
  await prisma.genreList.createMany({ data: genres });

  // Seed provinces
  await prisma.provinceList.createMany({ data: provinces });

  // Seed districts
  for (const provinceId in districts) {
    const districtData = districts[provinceId].map((district) => ({
      id: district.id,
      district: district.district,
      provinceId: parseInt(provinceId),
    }));
    await prisma.districtList.createMany({ data: districtData });
  }

  // Seed users
  await prisma.user.createMany({ data: users });

  // Seed reviews
  await prisma.review.createMany({ data: reviews });

  // Seed reports
  await prisma.report.createMany({ data: reports });
};

run()
  .then(async () => {
    await prisma.$disconnect(); // Disconnect from the database after finishing
  })
  .catch(async (e) => {
    console.error(e); // Log any errors
    await prisma.$disconnect(); // Disconnect from the database in case of error
    process.exit(1); // Exit the process with an error status
  });
