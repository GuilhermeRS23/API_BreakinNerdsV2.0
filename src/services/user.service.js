import bcrypt from "bcrypt";
import authService from "./auth.service.js";
import userRepositories from "../repositories/user.repositorie.js";

const createUserService = async ({ name, username, email, password, avatar, background }) => {
    if (!username || !name || !email || !password || !avatar || !background)
        throw new Error("Failed to send data! Check all fields.");

    const foundUser = await userRepositories.findByEmailUserRepository(email);

    if (foundUser) throw new Error("User already registered.");

    const user = await userRepositories.createUserRepository({
        name,
        username,
        email,
        password,
        avatar,
        background
    });

    if (!user) throw new Error("User registered successfully!");

    const token = authService.generateToken(user.id);

    return token;
};

const findAllUserService = async () => {
    const users = await userRepositories.findAllUserRepository();

    if (users.length === 0) throw new Error("No registered User!");

    return users;
};

const findUserByIdService = async (userIdParam, userIdLogged) => {
    let idParam;
    if (!userIdParam) {
        userIdParam = userIdLogged;
        idParam = userIdParam;
    } else {
        idParam = userIdParam;
    }
    if (!idParam)
        throw new Error("Send an id in the parameters to search for the user.");

    const user = await userRepositories.findByIdUserRepository(idParam);

    if (!user) throw new Error("No registered User!");

    return user;
};

const updateUserService = async ({ name, username, email, password, avatar, background },
    userId, userIdLogged ) => {

    if (!name && !username && !email && !password && !avatar && !background)
        throw new Error("Failed to submit while updating data! Please change at least some fields");

    const user = await userRepositories.findByIdUserRepository(userId);

    if (user._id != userIdLogged) throw new Error("You cannot update this user.");

    if (password) password = await bcrypt.hash(password, 10);

    await userRepositories.updateUserRepository(
        userId,
        name,
        username,
        email,
        password,
        avatar,
        background
    );

    return { message: "User updated successfully!" };
}

export default {
    createUserService,
    findAllUserService,
    findUserByIdService,
    updateUserService,
};
