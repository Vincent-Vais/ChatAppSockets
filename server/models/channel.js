const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  name: String,
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
