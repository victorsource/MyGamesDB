const urllib = require('urllib');
const { urlencoded } = require('express');
const db = require('../models/model');
const Developer = db.models.Developer;
const Genre = db.models.Genre;
const Platform = db.models.Platform;
const Game = db.models.Game;
const Franchise = db.models.Franchise;
const { Op } = require('sequelize');
const text = require('../cfg/lang').back.game;

const title_page = text.title;

exports.index = async (req, res, next) => {
  let action = '/admin/games/add';
  try {
    let developers = await Developer.findAll({
      order: [['name', 'ASC']],
    });
    let genres = await Genre.findAll({
      order: [['name', 'ASC']],
    });
    let platforms = await Platform.findAll({
      order: [['name', 'ASC']],
    });
    let franchises = await Franchise.findAll({
      order: [['name', 'ASC']],
    });
    let data = { developers, genres, platforms, franchises };
    res.render('admin/add_games', { action, title_page, data, messages: req.flash() });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  let input = {
    name: req.body.name,
    altNames: req.body.altNames,
    description: req.body.description,
    comments: req.body.comments,
    eurDate: req.body.dateEU || null,
    naDate: req.body.dateNA || null,
    jpDate: req.body.dateJP || null
  };
  try {
    let imgType = req.body.coverUrl.split('.').slice(-1)[0];
    if (imgType && imgType !== 'jpg') {
      req.flash('form_error', text.form_error.img_type);
      res.redirect('/admin/games/add');
    } else {
      const [game, created] = await Game.findOrCreate({
        where: {
          name: {
            [Op.like]: input.name,
          },
        },
        defaults: input,
      });
      if (created) {
        if (req.body.platforms) {
          await game.setPlatforms(req.body.platforms);
        }
        if (req.body.developers) {
          await game.setDevelopers(req.body.developers);
        }
        if (req.body.genres) {
          await game.setGenres(req.body.genres);
        }
        if (req.body.franchise !== '-1') {
          await game.setFranchise(parseInt(req.body.franchise));
        }
        if (req.body.coverUrl) {
          urllib.request(req.body.coverUrl, async (err, data, res) => {
            game.image = data.toString('base64');
            game.save();
          });
        }
        res.redirect('/admin/games');
      } else {
        req.flash('form_error', text.form_error.duplicated);
        res.redirect('/admin/games/add');
      }
    }
  } catch (err) {
    next(err);
  }
};

exports.game_list = async (req, res, next) => {  
  try {
    let games = await Game.findAll({
      order: [['id', 'DESC']],
      include: [Platform, Developer, Genre]
    });
    res.render('admin/games_list', { games, page:text.games });
  } catch (err) {
    next(err);
  }
}

exports.edit = async (req, res, next) => {  
  let edit;
  let data;
  try {
    let developers = await Developer.findAll({
      order: [['name', 'ASC']],
    });
    let genres = await Genre.findAll({
      order: [['name', 'ASC']],
    });
    let platforms = await Platform.findAll({
      order: [['name', 'ASC']],
    });
    let franchises = await Franchise.findAll({
      order: [['name', 'ASC']],
    });
    data = { developers, genres, platforms, franchises };
    edit = await Game.findOne({
      where: {
        id: req.params.id
      },
      include: [Franchise, Platform, Developer, Genre]
    });
    if (edit) {
      let action = `/admin/games/${edit.id}?_method=PUT`;
      const page = text.edit_page;
      res.render('admin/edit_game', { action, page, data, edit, messages: req.flash() });
    } else {
      res.redirect('/admin/games');
    }
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  let id = req.params.id;
  let input = {
    name: req.body.name,
    altNames: req.body.altNames,
    description: req.body.description,
    comments: req.body.comments,
    eurDate: req.body.dateEU || null,
    naDate: req.body.dateNA || null,
    jpDate: req.body.dateJP || null
  };
  try {
    let exist = await Game.findOne({
      where: {
        name: {
          [Op.like]: input.name,
        },
        id: {
          [Op.ne]: id,
        },
      },
    });
    if (!exist) {
      let imgType = req.body.coverUrl.split('.').slice(-1)[0];
      if (imgType && imgType !== 'jpg') {
        req.flash('form_error', text.form_error.img_type);
        res.redirect(`/admin/games/${id}/edit`);
      } else {
        let gameUpdate = await Game.findOne({
          where: {
            id: id
          },
          include: [Franchise, Platform, Developer, Genre]
        });
        gameUpdate.update(input);
        await gameUpdate.setPlatforms(req.body.platforms || null);
        await gameUpdate.setDevelopers(req.body.developers || null);
        await gameUpdate.setGenres(req.body.genres || null);
        if (req.body.franchise !== '-1') {
          await gameUpdate.setFranchise(parseInt(req.body.franchise));
        } else {
          await gameUpdate.setFranchise(null);
        }
        if (req.body.coverUrl) {
          urllib.request(req.body.coverUrl, async (err, data, res) => {
            gameUpdate.image = data.toString('base64');
            gameUpdate.save();
          });
        }
        res.redirect(`/admin/games/`);
      }
    } else {
      req.flash('form_error', text.form_error.duplicated);
      res.redirect(`/admin/games/${id}/edit`);
    }
  } catch (err) {
    next(err);
  }
}

exports.delete = async (req, res, next) => {
  let id = req.params.id;
  try {
    await Game.destroy({
      where: {
        id: id,
      },
    });
    res.redirect('/admin/games');
  } catch (err) {
    next(err);
  }
};