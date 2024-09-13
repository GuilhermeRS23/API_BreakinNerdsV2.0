import User from "../models/User.js";

const findAllUserRepository = () => User.findOne();

const findByEmailUserRepository = (email) => User.findOne({ email: email });

const createUserRepository = ({ name, username, email, password, avatar, background }) =>
    User.create({ name, username, email, password, avatar, background });

const findByIdUserRepository = (id) => User.findById(id);

const updateUserRepository = (id, name, username, email, password, avatar, background) =>
    User.findByIdAndUpdate(
        { _id: id },
        { name, username, email, password, avatar, background },
        { rawResult: true }
    );

export default {
    findAllUserRepository,
    createUserRepository,
    findByIdUserRepository,
    findByEmailUserRepository,
    updateUserRepository
}
