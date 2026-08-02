const prisma = require("../prisma");

const toggleLikeQuery = async (userId, drawingId) => {
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_drawingId: {
        userId: Number(userId),
        drawingId: Number(drawingId),
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        userId: Number(userId),
        drawingId: Number(drawingId),
      },
    });
  }

  const likeCount = await prisma.like.count({
    where: {
      drawingId: Number(drawingId),
    },
  });

  return {
    liked: !existingLike,
    likeCount,
  };
};

module.exports = {
  toggleLikeQuery,
};
