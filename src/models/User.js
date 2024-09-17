import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    background: {
        type: String,
        require: true
    }
});

UserSchema.pre("save", async function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model("User", UserSchema);

export default User;
