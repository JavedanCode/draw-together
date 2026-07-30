const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

const createUserQuery = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  return prisma.user.create({
    data: {
      email: user.email,
      username: user.username,
      password: hashedPassword,
    },
  });
};

module.exports = { createUserQuery };
