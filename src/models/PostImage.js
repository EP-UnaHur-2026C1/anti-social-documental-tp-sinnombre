import mongoose from "mongoose";

const postImageSchema = new mongoose.Schema(
{
    url: {
        type: String,
        required: true
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
},
{
    timestamps: true
});

export default mongoose.model("PostImage", postImageSchema);