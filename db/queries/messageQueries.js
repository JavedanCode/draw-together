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

const getAllMessagesQuery = async (userId) => {
  const drawings = await prisma.drawing.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
          featuredMember: true,
        },
      },

      likes: {
        select: {
          userId: true,
        },
      },

      _count: {
        select: {
          likes: true,
        },
      },
    },

    orderBy: {
      likes: {
        _count: "desc",
      },
    },
  });

  return drawings.map((drawing) => ({
    ...drawing,
    likedByCurrentUser: drawing.likes.some(
      (like) => like.userId === Number(userId),
    ),
  }));
};

const getFeaturedDrawingsQuery = async () => {
  return prisma.drawing.findMany({
    where: {
      author: {
        featuredMember: true,
      },
    },

    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },

      _count: {
        select: {
          likes: true,
        },
      },
    },

    orderBy: {
      likes: {
        _count: "desc",
      },
    },

    take: 10,
  });
};

const getDashboardStatsQuery = async (userId) => {
  const drawings = await prisma.drawing.findMany({
    where: {
      authorId: Number(userId),
    },
    include: {
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  const drawingCount = drawings.length;

  const totalLikes = drawings.reduce(
    (sum, drawing) => sum + drawing._count.likes,
    0,
  );

  const users = await prisma.user.findMany({
    include: {
      drawings: {
        include: {
          _count: {
            select: {
              likes: true,
            },
          },
        },
      },
    },
  });

  const ranking =
    users
      .map((user) => ({
        id: user.id,
        likes: user.drawings.reduce(
          (sum, drawing) => sum + drawing._count.likes,
          0,
        ),
      }))
      .sort((a, b) => b.likes - a.likes)
      .findIndex((user) => user.id === Number(userId)) + 1;

  return {
    drawingCount,
    totalLikes,
    ranking,
  };
};

const getMessageQuery = async (drawingId) => {
  return prisma.drawing.findUnique({
    where: {
      id: Number(drawingId),
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
  getFeaturedDrawingsQuery,
  getDashboardStatsQuery,
};
