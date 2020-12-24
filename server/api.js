const express = require("express");
const db = require("./models");
const router = express.Router();

const populateInnerMessages = (messages) =>
  new Promise((resolve, reject) => {
    let messagesArr = [];
    Promise.all(
      messages.map((message) => db.User.findById(message.user).exec())
    )
      .then((users) => {
        users.forEach((user, idx) => {
          const message = messages.find((message) =>
            message.user.equals(user._id)
          );
          messagesArr.push({ message: message.text, user: user.name });
        });
        resolve(messagesArr);
      })
      .catch((err) => reject(err));
  });

const populateInnerChannels = (channels) =>
  new Promise((resolve, reject) => {
    let response = [];
    Promise.all(
      channels.map((channel) => populateInnerMessages(channel.messages))
    )
      .then((messages) => {
        messages.forEach((messageArr, idx) => {
          response.push({
            name: channels[idx].name,
            messages: messageArr,
            users: channels[idx].users.map(({ name }) => name),
          });
        });
        resolve(response);
      })
      .catch((err) => reject(err));
  });

router.get("/", (req, res) => {
  db.Channel.find({})
    .populate({
      path: "messages users",
      populate: [
        {
          path: "messages.user",
        },
      ],
    })
    .exec()
    .then((results) => populateInnerChannels(results))
    .then((response) => res.status(200).json({ channels: response }))
    .catch(() => {
      res.status(404).json({ channels: null });
    });
});

module.exports = router;
