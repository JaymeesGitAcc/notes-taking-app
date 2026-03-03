import mongoose from "mongoose"

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "all"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    notes: {
        type: [string],
        default: []
    }
},{timestamps: true})

const Category = mongoose.model("Category", categorySchema)

export default Category