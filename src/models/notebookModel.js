import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  topic: {
    type: "String",
    required: [true, "Please provide notebook name"],
  },
  createdAt: { type: Date, default: Date.now() },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
}, { timestamps: true });

const Notebook =
  mongoose.models.notebooks || mongoose.model("notebooks", Schema);

export default Notebook;
