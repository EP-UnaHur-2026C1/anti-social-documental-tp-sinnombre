import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    nickName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
},
{
    timestamps: true
});

export default mongoose.model("User", userSchema);