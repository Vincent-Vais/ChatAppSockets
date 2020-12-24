const db = require("./index");

const channels = ["JavaScript", "Python", "C++", "Java"];

const users = [
  "Mike",
  "Jacob",
  "Stan",
  "Andrew",
  "Jane",
  "Dana",
  "Maria",
  "Sveta",
];

const messages = [
  "Hello everyone!",
  "Wow! New message",
  "That is liiit",
  "Hello World",
  "World says hello to you",
  "Weekend",
  "What are yall listening to?",
];

function seed() {
  console.log("seed start");
  function createChannles() {
    return new Promise((resolve, reject) => {
      channels.forEach((name) => {
        const newChannel = new db.Channel({ name });
        newChannel
          .save()
          .then(() => {
            console.log("saved");
          })
          .catch((err) => reject(err));
      });
      resolve("success");
    });
  }
  createChannles()
    .then((message) => {
      console.log(message);
      for (user of users) {
        const newUser = new db.User({ user });
        newUser
          .save()
          .then((savedUser) => {
            const newMessage = new db.Message({
              user: savedUser,
              text: messages[Math.floor(Math.random() * messages.length)],
            });
            return newMessage.save();
          })
          .then((savedMessage) => {
            function customFind() {
              return new Promise((resolve, reject) => {
                db.Channel.find({})
                  .exec()
                  .then((result) => resolve({ channels: result, savedMessage }))
                  .catch((err) => reject(err));
              });
            }
            return customFind();
          })
          .then(({ channels, savedMessage }) => {
            console.log(channels);
            const channel =
              channels[Math.floor(Math.random() * channels.length)];
            channel.messages.push(savedMessage);
            channel.users.push(savedMessage.user);
            channel.save();
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}

module.exports = seed;
