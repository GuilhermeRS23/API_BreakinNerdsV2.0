import gameService from "../services/game.service.js";

const createdGameController = async(req, res) => {
  const { title, cover, description } = req.body;
  const userId = req.userId;

  try {
    const game = await gameService.createGameService(
      { title, cover, description },
      userId
    );
    return res.status(201).send(game);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const findAllGamesController = async(req, res) => {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const games = await gameService.findAllGamesService(
      limit,
      offset,
      currentUrl
    );
    return res.send(games);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const topGameController = async(req, res) => {
  try {
    const game = await gameService.topGameService();
    return res.send(game);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const searchGameController = async(req, res) => {
  const { title } = req.query;

  try {
    const foundGames = await gameService.searchGameService(title);

    return res.send(foundGames);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const findGameByIdController = async(req, res) => {
  const { id } = req.params;

  try {
    const game = await gameService.findGameByIdService(id);
    return res.send(game);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const findGamesByUserIdController = async(req, res) => {
  const id = req.userId;
  try {
    const games = await gameService.findGamesByUserIdService(id);
    return res.send(games);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const updateGameController = async(req, res) => {
  const { title, cover, description } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    await gameService.updateGameService(id, title, cover, description, userId);

    return res.send({ message: "Game updated successfully!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const deleteGameController = async(req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await gameService.deleteGameService(id, userId);
    return res.send({ message: "Game deleted successfully!" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const likeGameController = async(req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await gameService.likeGameService(id, userId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const addCommentGameController = async(req, res) => {
  const { id: gameId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await gameService.addCommentGameService(gameId, message, userId);

    return res.send({
      message: "Comment sent successfully!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const commentDeleteGameController = async(req, res) => {
  const { id: gameId, idComment } = req.params;
  const userId = req.userId;

  try {
    await gameService.commentDeleteGameService(gameId, userId, idComment);

    return res.send({ message: "Comment removed successfully!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

export default {
  createdGameController,
  findAllGamesController,
  topGameController,
  searchGameController,
  findGameByIdController,
  findGamesByUserIdController,
  updateGameController,
  deleteGameController,
  likeGameController,
  addCommentGameController,
  commentDeleteGameController
};
