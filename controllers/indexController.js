const { Op } = require("sequelize");
const db = require('../models/model');
const Game = db.models.Game;
const Developer = db.models.Developer;
const Genre = db.models.Genre;
const Platform = db.models.Platform;
const Franchise = db.models.Franchise;
const text = require('../cfg/lang').front;

exports.index = async (req, res, next) => {
  try {
    let platforms = await Platform.findAll({
      order: [['name', 'ASC']],
      include: Game
    });    
    let games = await Game.findAll({
      order: [['name', 'ASC']],
      include: [Platform, Developer, Genre],
    });  
    res.render('index', { platforms, games });
  } catch (err) {
    next(err);
  }
};

exports.games_platform = async (req, res, next) => {
  try {
    let p_id = req.params.id;
    let games = await Game.findAll({
      order: [['name', 'ASC']],
      include: [
        {
          model: Platform,
          where: {
            id: p_id
          },
        },
        Developer,
        Genre
      ]
    });
    let platforms = await Platform.findAll({
      order: [['name', 'ASC']],
      include: Game
    });
    res.render('index', { platforms, games });
  } catch (err) {
    next(err);
  }
};

exports.game = async (req, res, next) => {
  try {
    let g_id = req.params.id;
    let game = await Game.findOne({
      where: {
        id: g_id
      },
      include: [Platform, Developer, Genre, Franchise]
    });
    if (game) {
      let platforms = await Platform.findAll({
        order: [['name', 'ASC']],
        include: Game
      });      
      res.render('index/game', { text, platforms, game });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    let title = req.query.title;
    if (title.length > 0) {
      let games = await Game.findAll({
        where: {
          name: {
            [Op.substring]: title
          }
        },
        include: [Platform, Developer, Genre],
      });
      let platforms = await Platform.findAll({
        order: [['name', 'ASC']],
        include: Game
      });
      res.render('index', { platforms, games });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    next(err)
  }
}
