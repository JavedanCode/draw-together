const prisma = require("../prisma");

const updateMembershipQuery = async (userId) => {
  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      featuredMember: true,
    },
  });
};

module.exports = {
  updateMembershipQuery,
};
