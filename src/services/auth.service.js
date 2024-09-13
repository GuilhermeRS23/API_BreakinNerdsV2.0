import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import userRepositories from "../repositories/user.repository.js";

function generateToken(id) {
    return jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });
};

const loginService = async ({ email, password }) => {
    const user = await userRepositories.findByEmailUserRepository(email);
    if (!user) throw new Error("Incorrect password or username.");

    //Parte com erro
    const validPassword = bcrypt.compareSync(password, user.password);
    
    if (!validPassword) throw new Error("Incorrect password or username.");

    const token = generateToken(user.id);

    return token;
};

export default {
    loginService,
    generateToken
}
