const db = require("./models");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

class Messages {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.token = process.env.TOKEN_SECRET;
    this.init();
  }

  // Io/socket funcs
  subscribe(type, cb) {
    this.socket.on(type, cb);
  }

  emitAuth(message) {
    this.socket.emit("authNotification", message);
  }

  emitUsername(message) {
    this.socket.emit("usernameNotification", message);
  }

  emitChat(message) {
    this.socket.emit("chatNotification", message);
  }
  broadcastAllChat(message) {
    this.io.emit("chatNotification", message);
  }
  broadcastOthersChat(message) {
    this.socket.broadcast.emit("chatNotification", message);
  }

  emitSystem(message) {
    this.socket.emit("systemNotification", message);
  }
  broadcastAllSystem(message) {
    this.io.emit("systemNotification", message);
  }
  broadcastOthersSystem(message) {
    this.socket.broadcast.emit("systemNotification", message);
  }

  // Tokens
  generateToken(data, cb) {
    jwt.sign(data, this.token, { expiresIn: "1800s" }, cb);
  }
  validateToken(token, cb) {
    jwt.verify(token, this.token, cb);
  }

  // Chat funcs
  broadcastMessage(data) {
    const { user, message, channelName } = JSON.parse(data);
    db.utils
      .addMessageToChannel(message, channelName, user)
      .then(() => this.broadcastAllChat(data))
      .catch((err) => console.log(err));
  }

  // Username funcs
  verifyUsernameIsEmpty(username) {
    db.utils
      .checkIfUsernameExists(username)
      .then((res) => {
        if (res) {
          this.emitUsername(JSON.stringify({ token: false }));
        } else {
          this.generateToken({ username }, (err, token) => {
            console.log(token);
            if (err) {
              this.emitUsername(JSON.stringify({ token: false }));
            } else {
              this.emitUsername(JSON.stringify({ token }));
            }
          });
        }
      })
      .catch(() => this.emitUsername(JSON.stringify({ token: false })));
  }

  // System funcs
  addPersonToChannel(username, channelName) {
    db.utils
      .handleUpdateUsersInChannel(channelName, username, "add")
      .then((result) =>
        this.broadcastOthersSystem(
          JSON.stringify({
            channelName,
            users: result,
            message: `${username} has joined the chat`,
          })
        )
      )
      .catch((err) => console.log(err));
  }
  removePersonFromChannel(username, channelName) {
    db.utils
      .handleUpdateUsersInChannel(channelName, username, "remove")
      .then((result) =>
        this.broadcastOthersSystem(
          JSON.stringify({
            channelName,
            users: result,
            message: `${username} has left ${channelName} chat`,
          })
        )
      )
      .catch((err) => console.log(err));
  }

  init() {
    // Subscribing to auth events
    this.subscribe("authEvent", (message) => {
      const { token } = JSON.parse(message);
      if (token)
        this.validateToken(token, (err, data) => {
          if (!err) this.emitAuth("ok");
        });
    });
    // Subscribing to username events
    this.subscribe("usernameEvent", (message) => {
      const { username } = JSON.parse(message);
      this.verifyUsernameIsEmpty(username);
    });

    // Subscribing to system events
    this.subscribe("systemEvent", (message) => {
      const { username, channelName, joined } = JSON.parse(message);
      if (joined) {
        this.addPersonToChannel(username, channelName);
      } else {
        this.removePersonFromChannel(username, channelName);
      }
    });

    // Subscribing to chat events
    this.subscribe("chatEvent", (message) => this.broadcastMessage(message));
  }
}

module.exports = Messages;
