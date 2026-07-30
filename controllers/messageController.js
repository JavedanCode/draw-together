const messageQueries = require("../db/queries/messageQueries");

const getAllMessages = async (req, res, next) => {
  try {
    const messages = await messageQueries.getAllMessagesQuery();
    res.render("dashboard", { title: "Dashboard", messages });
  } catch (err) {
    next(err);
  }
};

const getUserMessages = async (req, res, next) => {
  try {
    const messages = await messageQueries.getUserMessagesQuery(req.user.id);
    res.render("messages", { title: "Messages", messages });
  } catch (err) {
    next(err);
  }
};

const getMessageForm = async (req, res) => {
  res.render("MessageForm", { title: "Create Message" });
};

const getUpdateMessageForm = async (req, res) => {
  res.render("UpdateMessage", { title: "Update Message" });
};

const addMessage = async (req, res, next) => {
  try {
    await messageQueries.addMessageQuery(req.body.imageData, req.user.id);
    return res.redirect("/");
  } catch (err) {
    next(err);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    await messageQueries.deleteMessageQuery(req.drawing.id);
    return res.redirect("/");
  } catch (err) {
    next(err);
  }
};

const updateMessage = async (req, res, next) => {
  try {
    await messageQueries.updateMessageQuery(req.drawing.id, {
      imageData: req.body.imageData,
    });
    return res.redirect("/");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addMessage,
  updateMessage,
  deleteMessage,
  getAllMessages,
  getMessageForm,
  getUpdateMessageForm,
  getUserMessages,
};
