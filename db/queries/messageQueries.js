const prisma = require("../prisma");

const addMessageQuery = async (imageData, userId) => {
  return prisma.drawing.create({
    data: {
      imageData,
      authorId: userId,
    },
  });
};

const deleteMessageQuery = async (messageId) => {
  await prisma.drawing.delete({
    where: {
      id: Number(messageId),
    },
  });
};

const updateMessageQuery = async (id, data) => {
  await prisma.drawing.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

const getUserMessagesQuery = async (userId) => {
  return prisma.drawing.findMany({
    where: { authorId: Number(userId) },
  });
};

const getAllMessagesQuery = async () => {
  return prisma.drawing.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getMessageQuery = async (userId, drawingId) => {
  return prisma.drawing.findFirst({
    where: {
      id: Number(drawingId),
      authorId: Number(userId),
    },
  });
};

module.exports = {
  addMessageQuery,
  deleteMessageQuery,
  updateMessageQuery,
  getAllMessagesQuery,
  getUserMessagesQuery,
  getMessageQuery,
};
