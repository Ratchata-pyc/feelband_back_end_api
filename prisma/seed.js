const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const roles = ["Guitar", "Bass", "Piano", "Voice", "Drum", "Saxophone"];
const genres = ["Pop", "Rock", "Jazz", "Blues"];
const provinces = [
  { id: 1, label: "กรุงเทพมหานคร" },
  { id: 2, label: "เชียงใหม่" },
  { id: 3, label: "ภูเก็ต" },
  { id: 4, label: "ชลบุรี" },
];
const districts = {
  1: [
    { id: 1, label: "บางกะปิ" },
    { id: 2, label: "ห้วยขวาง" },
  ],
  2: [
    { id: 3, label: "เมืองเชียงใหม่" },
    { id: 4, label: "หางดง" },
  ],
  3: [
    { id: 5, label: "เมืองภูเก็ต" },
    { id: 6, label: "กะทู้" },
  ],
  4: [
    { id: 7, label: "เมืองชลบุรี" },
    { id: 8, label: "บางละมุง" },
  ],
};

const run = async () => {
  // Seed roles
  await prisma.role_list.createMany({
    data: roles.map((role) => ({ role })),
  });

  // Seed genres
  await prisma.genre_list.createMany({
    data: genres.map((genre) => ({ genre })),
  });

  // Seed provinces
  await prisma.province_list.createMany({
    data: provinces.map((province) => ({
      id: province.id,
      province: province.label,
    })),
  });

  // Seed districts
  for (const provinceId in districts) {
    const districtData = districts[provinceId].map((district) => ({
      id: district.id,
      district: district.label,
      provinceId: parseInt(provinceId),
    }));
    await prisma.district_list.createMany({ data: districtData });
  }
};

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
