import bcrypt from "bcrypt";
import authService from "./auth.service.js";
import userRepositories from "../repositories/user.repositories.js";

const createUserService = async ({ name, username, email, password, avatar, background }) => {
    if (!username || !name || !email || !password || !avatar || !background)
        throw new Error("Falha ao enviar os dados! Verificar todos os campos.");

    const foundUser = await userRepositories.findByEmailUserRepository(email);

    if (foundUser) throw new Error("Usuário já existente");

    const user = await userRepositories.createUserRepository({
        name,
        username,
        email,
        password,
        avatar,
        background
    });

    if (!user) throw new Error("Usuário cadastrado com sucesso!");

    const token = authService.generateToken(user.id);

    return token;
};

const findAllUserService = async () => {
    const users = await userRepositories.findAllUserRepository();

    if (users.length === 0) throw new Error("Nenhum usuário cadastrado");

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
        throw new Error("Envie um id nos parâmetros para buscar o usuário");

    const user = await userRepositories.findByIdUserRepository(idParam);

    if (!user) throw new Error("Usuário não encontrado");

    return user;
};

const updateUserService = async ({ name, username, email, password, avatar, background },
    userId, userIdLogged ) => {

    if (!name && !username && !email && !password && !avatar && !background)
        throw new Error("Falha ao enviar ao atualizar os dados! Alterar pelo menos alguns campo");

    const user = await userRepositories.findByIdUserRepository(userId);

    if (user._id != userIdLogged) throw new Error("Você não pode atualizar esse usuário");

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

    return { message: "Usuário atualizado com sucesso!" };
}

export default {
    createUserService,
    findAllUserService,
    findUserByIdService,
    updateUserService,
};
