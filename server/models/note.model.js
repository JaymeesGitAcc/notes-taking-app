import mongoose from "mongoose"

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    color: {
      type: String,
      default: "#fff",
    },
  },
  { timestamps: true },
)

const Note = mongoose.model("Note", noteSchema)

export default Note
