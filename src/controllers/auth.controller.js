import authService from "../services/auth.service.js";

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.loginService({ email, password });
        return res.json({
            token
        });

    } catch (error) {
        return res.status(401).send(error.message);
    }
};

export default loginController;
