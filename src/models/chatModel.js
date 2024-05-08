import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  query: {
    type: "String",
  },
  response: {
    type: "String",
  },
  notebook: { type: mongoose.Schema.Types.ObjectId, ref: "notebooks" },
});

const Chat = mongoose.models.chats || mongoose.model("chats", Schema);

export default Chat;
