//Create User Edge Cases:
//User/Username already exists

const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

const createUserQuery = async (user) => {
  const userExists = await prisma.user.findUnique({
    where: {
      username: user.username,
    },
  });

  if (userExists) {
    const err = new Error("Username already exists");
    err.status = 409;
    throw err;
  }

  const emailExists = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (emailExists) {
    const err = new Error("User with this email already exists");
    err.status = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  await prisma.user.create({
    data: {
      email: user.email,
      username: user.username,
      password: hashedPassword,
    },
  });
};

module.exports = { createUserQuery };
