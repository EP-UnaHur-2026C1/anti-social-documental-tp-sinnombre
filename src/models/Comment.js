import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
{
    content: {
        type: String,
        required: true,
        trim: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },

    visible: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

export default mongoose.model("Comment", commentSchema);