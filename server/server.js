const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const apiRoute = require("./api");
const Messages = require("./messages");

const app = express(),
  PORT = process.env.PORT || 5000,
  server = http.createServer(app),
  io = socketio(server);

io.on("connection", (socket) => {
  new Messages(io, socket);
  // mySocket = socket;
  // socket.on("userMessage", (message) => {
  //   socket.broadcast.emit("userMessage", message);
  // });
  // socket.on("chatMessage", (message) => {
  //   // channel name, user name, text
  //   // update db
  //   // send a message to client (name and text)
  //   // on the client we need to update store
  //   io.emit("chatMessage", message);
  // });
  // socket.on("disconnect", () => {
  //   console.log("disconnected");
  // });
});

app.use(
  express.static(path.join(__dirname, "../client/build"), { index: false })
);

app.get("/", (req, res) => {
  res.sendFile("./index.html", {
    root: path.join(__dirname, "../client/build"),
  });
});

app.use("/api", apiRoute);

app.get("/:anything", (req, res) => res.redirect("/"));

server.listen(PORT, () => console.log(`listening on ${PORT}`));
