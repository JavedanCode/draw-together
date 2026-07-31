const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./db/prisma");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");
const messageRoutes = require("./routes/messageRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const userRoutes = require("./routes/userRoutes");
const indexRoutes = require("./routes/indexRoutes");

require("dotenv").config();
require("./config/passport");

const PORT = process.env.PORT || 3000;
const path = require("node:path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  }),
);

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdFunction: undefined,
      dbRecordIdIsSessionId: true,
    }),
  }),
);

app.use(passport.session());

app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);
app.use("/messages", messageRoutes);
app.use("/user", userRoutes);
app.use("/membership", membershipRoutes);
app.use("/", indexRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500);

  res.render("500", {
    title: "Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : null,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
