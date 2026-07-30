const prisma = require("../prisma");

const getUserInfoQuery = async (id) => {
  return prisma.user.findUnique({
    where: { id: Number(id) },
  });
};

const updateUserInfoQuery = async (id, data) => {
  return prisma.user.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

const deleteUserQuery = async (id) => {
  return prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  getUserInfoQuery,
  updateUserInfoQuery,
  deleteUserQuery,
};
