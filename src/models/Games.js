import mongoose from "mongoose";

const GamesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true,
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    cover: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Array,
        require: true
    },
    comments: {
        type: Array,
        require: true
    }
});

const Games = mongoose.model("Games", GamesSchema);

export default Games;
