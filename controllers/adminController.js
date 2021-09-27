const db = require('../models/model');
const Developer = db.models.Developer;
const Genre = db.models.Genre;
const Platform = db.models.Platform;
const Game = db.models.Game;

exports.index = async (req, res, next) => {
  let games = await Game.findAll({
    order: [['id', 'DESC']],
    include: [Platform, Developer, Genre],
    limit: 15
  });
  let stats = {
    games: await Game.count(),
    platforms: await Platform.count()
  };
  res.render('admin', { games, stats });
};
