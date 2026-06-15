import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
{
    description: {
        type: String,
        required: true,
        trim: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostImage"
    }],

    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }]
},
{
    timestamps: true
});

export default mongoose.model("Post", postSchema);