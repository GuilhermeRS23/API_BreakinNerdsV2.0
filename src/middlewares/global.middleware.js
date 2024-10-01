import mongoose from "mongoose";

const validId = (req, res, next) => {
    try {
        let idParam;

        if (!req.params.id) {
            req.params.id = req.userId;
            idParam = req.params.id;
        } else {
            idParam = req.params.id;
        }

        if (!mongoose.Types.ObjectId.isValid(idParam)) {
            return res.status(400)
                .send({ message: "Invalid ID" })
        }
        next();
    } catch (e) {
        console.error(e)
    }
};

export default validId;
