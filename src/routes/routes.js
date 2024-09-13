import { Router } from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import gameRouter from "./game.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/game", gameRouter);

export default router;
