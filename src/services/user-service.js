const prisma = require("../model/prisma");

const userFiltered = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  profileImage: true,
  createdAt: true,
  updatedAt: true,
};

const userService = {};

userService.createUser = (data) => prisma.user.create({ data });

userService.findUserByEmail = (email) =>
  prisma.user.findFirst({
    where: {
      email: email,
    },
  });

userService.findUserById = (userId) =>
  prisma.user.findUnique({ where: { id: userId } });

userService.updateUserById = (data, userId) =>
  prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });

userService.findUserByIdList = (idList) =>
  prisma.user.findMany({
    where: { id: { in: idList } },
    select: userFiltered,
  });

module.exports = userService;
