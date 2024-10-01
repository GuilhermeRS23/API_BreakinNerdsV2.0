import Games from "../models/Games.js";
import { v4 as uuidv4 } from "uuid";

const createGamesRepository = (title, cover, description, userId) => {
    return Games.create({ title, cover, description, user: userId });
};

const findAllGamessRepository = (offset, limit) => {
    return Games.find()
        .sort({ _id: -1 })
        .skip(offset)
        .limit(limit)
        .populate("user");
};

const topGameRepository = () => Games.findOne().sort({ _id: -1 }).populate("user");

const findGamesByIdRepository = (id) => Games.findById(id).populate("user");

const countGames = () => Games.countDocuments();

const searchGamesRepository = (title) => {
    return Games.find({
        title: { $regex: `${title || ""}`, $options: "i" },
    })
        .sort({ _id: -1 })
        .populate("user");
};

const findGamesByUserIdRepository = (id) => {
    return Games.find({
        user: id,
    })
        .sort({ _id: -1 })
        .populate("user");
};

const updateGamesRepository = (id, title, cover, description) => {
    return Games.findOneAndUpdate(
        {
            _id: id,
        },
        {
            title,
            cover,
            description
        },
        {
            rawResult: true,
        }
    );
};

const deleteGamesRepository = (id) => {
    return Games.findOneAndDelete({ _id: id });
};

const likesRepository = (id, userId) => {
    return Games.findOneAndUpdate(
        {
            _id: id,
            "likes.userId": { $nin: [userId] },
        },
        {
            $push: {
                likes: { userId, created: new Date() },
            },
        },
        {
            rawResult: true,
        }
    );
};

const likesDeleteRepository = (id, userId) => {
    return Games.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $pull: {
                likes: {
                    userId: userId,
                },
            },
        }
    );
};

const commentsRepository = (id, message, userId) => {
    let idComment = uuidv4();
    return Games.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $push: {
                comments: { idComment, userId, message, createdAt: new Date() },
            },
        },
        {
            rawResult: true,
        }
    );
};

const commentsDeleteRepository = (id, userId, idComment) => {
    return Games.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $pull: {
                comments: {
                    idComment: idComment,
                    userId: userId,
                },
            },
        }
    );
};

export default {
    createGamesRepository,
    findAllGamessRepository,
    topGameRepository,
    findGamesByIdRepository,
    searchGamesRepository,
    findGamesByUserIdRepository,
    updateGamesRepository,
    deleteGamesRepository,
    likesRepository,
    likesDeleteRepository,
    commentsRepository,
    commentsDeleteRepository,
    countGames
};
