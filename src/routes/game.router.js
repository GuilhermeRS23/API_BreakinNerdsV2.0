import { Router } from "express";
import gameController from "../controllers/game.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validId from "../middlewares/global.middleware.js";

const gameRouter = Router();

gameRouter.get("/", gameController.findAllGamesController);
gameRouter.get("/top", gameController.topGameController);
gameRouter.get("/search", gameController.searchGameController);

gameRouter.use(authMiddleware)
gameRouter.post("/created", gameController.createdGameController);

gameRouter.use(validId);
gameRouter.get("/:id", gameController.findGameByIdController);
gameRouter.get("/byUserId/:id", gameController.findGamesByUserIdController);
gameRouter.patch("/updated/:id", gameController.updateGameController);
gameRouter.delete("/deleted/:id", gameController.deleteGameController);
gameRouter.patch("/like/:id", gameController.likeGameController);
gameRouter.patch("/comment/:id", gameController.addCommentGameController);
gameRouter.patch("/:id/:idComment/comment", gameController.commentDeleteGameController);

export default gameRouter;
