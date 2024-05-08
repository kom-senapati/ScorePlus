import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  topic: {
    type: "String",
    required: [true, "Please provide notebook name"],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Notebook =
  mongoose.models.notebooks || mongoose.model("notebooks", Schema);

export default Notebook;
