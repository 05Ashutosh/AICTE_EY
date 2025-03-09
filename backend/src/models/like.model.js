import mongoose from "mongoose";
const { Schema } = mongoose;

const likeSchema = new Schema(
    {
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
        recipe: {
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Like = mongoose.model("Like", likeSchema);