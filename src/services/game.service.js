import gameRepositories from "../repositories/game.repository.js";

const createGameService = async({ title, cover, description }, userId) => {
  if (!title || !cover || !description)
    throw new Error("Failed to send data! Check all fields.");

  const { id } = await gameRepositories.createGamesRepository(
    title,
    cover,
    description,
    userId
  );

  return {
    message: "Game created successfully!",
    game: { id, title, cover, description },
  };
};

const findAllGamesService = async (limit, offset, currentUrl) => {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const games = await gameRepositories.findAllGamessRepository(offset, limit);

  const total = await gameRepositories.countGames();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  games.shift();

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: games.map((game) => ({
      id: game._id,
      title: game.title,
      cover: game.cover,
      description: game.description,
      likes: game.likes,
      comments: game.comments,
      name: game.user.name,
      username: game.user.username,
      avatar: game.user.avatar,
    })),
  };
};

const topGameService = async() => {
  const game = await gameRepositories.topGameRepository();

  if (!game) throw new Error("No games registered.");

  return {
    game: {
      id: game._id,
      title: game.title,
      cover: game.cover,
      description: game.description,
      likes: game.likes,
      comments: game.comments,
      name: game.user.name,
      username: game.user.username,
      avatar: game.user.avatar,
    },
  };
};

const searchGameService = async (title) => {
  const foundGames = await gameRepositories.searchGamesRepository(title);

  if (foundGames.length === 0)
    throw new Error(`No records found for the term "${title}"`);

  return {
    foundGames: foundGames.map((game) => ({
      id: game._id,
      title: game.title,
      cover: game.cover,
      description: game.description,
      likes: game.likes,
      comments: game.comments,
      name: game.user.name,
      username: game.user.username,
      avatar: game.user.avatar
    })),
  };
};

const findGameByIdService = async (id) => {
  const game = await gameRepositories.findGamesByIdRepository(id);

  if (!game) throw new Error("Game not found or deleted.");

  return {
    id: game._id,
    title: game.title,
    cover: game.cover,
    description: game.description,
    likes: game.likes,
    comments: game.comments,
    name: game.user.name,
    username: game.user.username,
    avatar: game.user.avatar
  };
};

const findGamesByUserIdService = async (id) => {
  const games = await gameRepositories.findGamesByUserIdRepository(id);

  return {
    gamesByUser: games.map((game) => ({
      id: game._id,
      title: game.title,
      cover: game.cover,
      description: game.description,
      likes: game.likes,
      comments: game.comments,
      name: game.user.name,
      username: game.user.username,
      avatar: game.user.avatar
    })),
  };
};

const updateGameService = async (id, title, cover, description, userId) => {
  if (!title && !cover && !description)
    throw new Error("Failed to send data! Please enter at least one field.");

  const game = await gameRepositories.findGamesByIdRepository(id);

  if (!game) throw new Error("Game not found.");

  if (game.user._id != userId) throw new Error("You can't change this game!");

  await gameRepositories.updateGamesRepository(id, title, cover, description);
};

const deleteGameService = async (id, userId) => {
  const game = await gameRepositories.findGamesByIdRepository(id);

  if (!game) throw new Error("Game not found.");

  if (game.user._id != userId) throw new Error("You can't delete this game.");

  await gameRepositories.deleteGamesRepository(id);
};

const likeGameService = async (id, userId) => {
  const gameLiked = await gameRepositories.likesRepository(id, userId);

  if (!gameLiked) {
    await gameRepositories.likesDeleteRepository(id, userId);
    return { message: "Like removed successfully!" };
  }

  return { message: "Like added successfully!" };
};

const addCommentGameService = async (gameId, message, userId) => {
  if (!message) throw new Error("It is not allowed to send the comments field empty.");

  const game = await gameRepositories.findGamesByIdRepository(gameId);

  if (!game) throw new Error("Game not found!");

  await gameRepositories.commentsRepository(gameId, message, userId);
};

const commentDeleteGameService = async (gameId, userId, idComment) => {
  const game = await gameRepositories.findGamesByIdRepository(gameId);

  if (!game) throw new Error("Game not found.");

  await gameRepositories.commentsDeleteRepository(gameId, userId, idComment);
};

export default {
  createGameService,
  findAllGamesService,
  topGameService,
  searchGameService,
  findGameByIdService,
  findGamesByUserIdService,
  updateGameService,
  deleteGameService,
  likeGameService,
  addCommentGameService,
  commentDeleteGameService
};
