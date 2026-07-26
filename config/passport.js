const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../db/prisma");
const bcrypt = require("bcryptjs");

const verfyCallback = async (username, password, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return done(null, false, {
        message: "Incorrect username",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return done(null, false, {
        message: "Incorrect password",
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

passport.use(new LocalStrategy(verfyCallback));
