import jwt from "jsonwebtoken";
import "dotenv/config";
import userRepositories from "../repositories/user.repository.js";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401)
                .send({ message: "The token was not informed!" });

        const parts = authHeader.split(" ");
        if (parts.length !== 2)
            return res.status(401)
                .send({ message: "Invalid token!" });

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme))
            return res.status(401)
                .send({ message: "Malformatted Token!" });

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) return res.status(401)
                .send({ message: "Invalid token!" });

            const user = await userRepositories.findByIdUserRepository(decoded.id);
            if (!user || !user.id)
                return res.status(401)
                    .send({ message: "Invalid token!" });

            req.userId = user.id;
            return next();
        });
    } catch (e) {
        console.error(e)
    }
};

export default authMiddleware;
