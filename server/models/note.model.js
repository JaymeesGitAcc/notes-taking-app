import mongoose from "mongoose"

const noteSchema = mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String
    },
    tags: {
        type: [String],
        default: []
    },
    pinned: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    color: {
        type: String,
    }
}, {timestamps: true})

const Note = mongoose.model("Note", noteSchema)

export default Note

