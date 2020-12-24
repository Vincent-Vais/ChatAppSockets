const db = require("./index");

const addToCollection = (collection, data) => {
  const item = new collection(data);
  return item.save();
};

const addItemToDocArr = (doc, arr, item) => {
  arr.push(item);
  return doc.save();
};

const removeItemFromDocArr = (doc, arr, id) => {
  arr.pull({ _id: id });
  return doc.save();
};

const findChannel = (name) =>
  new Promise((resolve, reject) => {
    db.Channel.findOne({ name })
      .populate("users messages")
      .exec()
      .then((channel) => {
        resolve(channel);
      })
      .catch(() => {
        reject("Unable to find channel");
      });
  });

const modifyChannel = (channel, name, type) => {
  if (type === "add") return addUserToChannel(channel, name);
  else return removeUserFromChannel(channel, name);
};

const addUserToChannel = (channel, name) =>
  new Promise((resolve, reject) => {
    let found = false;
    const newUsers = channel.users.reduce((acc, cur) => {
      if (cur.name === name) {
        found = true;
      }
      acc.push(cur.name);
      return acc;
    }, []);
    if (!found) {
      newUsers.push(name);
      addToCollection(db.User, { name })
        .then((savedUser) => addItemToDocArr(channel, channel.users, savedUser))
        .then(() => resolve(newUsers))
        .catch((err) => reject(err));
    } else {
      resolve(newUsers);
    }
  });

const removeUserFromChannel = (channel, name) =>
  new Promise((resolve, reject) => {
    let id;
    const newUsers = channel.users.reduce((acc, cur) => {
      if (cur.name === name) {
        id = cur._id;
      } else {
        acc.push(cur.name);
      }
      return acc;
    }, []);
    if (id) {
      removeItemFromDocArr(channel, channel.users, id)
        .then(() => resolve(newUsers))
        .catch((err) => reject(err));
    } else {
      return new Promise((resolve, reject) => resolve(newUsers));
    }
  });

const utils = {
  handleUpdateUsersInChannel: (channelName, username, type) =>
    new Promise((resolve, reject) => {
      findChannel(channelName)
        .then((channel) => modifyChannel(channel, username, type))
        .then((newUsers) => resolve(newUsers))
        .catch((err) => reject(err));
    }),
  checkIfUsernameExists: (name) => db.User.findOne({ name }).exec(),
  addMessageToChannel: (message, channelName, user) =>
    new Promise((resolve, reject) => {
      let newMessage;
      db.User.find({ name: user })
        .exec()
        .then((foundUser) => {
          newMessage = new db.Message({ user: foundUser._id, text: message });
          return newMessage.save();
        })
        .then(() => db.Channel.findOne({ name: channelName }).exec())
        .then((foundChannel) => {
          foundChannel.messages.push(newMessage);
          resolve();
        })
        .catch(() => reject());
    }),
};

module.exports = utils;
