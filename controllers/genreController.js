const db = require('../models/model');
const Genre = db.models.Genre;
const { Op } = require('sequelize');
const text = require('../cfg/lang').back.genre;

const title_page = text.title;

exports.index = async (req, res, next) => {
  let action = '/admin/genres/add';
  let page = 'genres';
  let data;
  try {
    data = await Genre.findAll({
      order: [['name', 'ASC']],
    });
    res.render('admin/generic_onefield', { action, data, page, title_page, messages: req.flash() });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  let name = req.body.name.trim();
  try {
    const [genre, created] = await Genre.findOrCreate({
      where: {
        name: {
          [Op.like]: name,
        },
      },
      defaults: {
        name: name,
      },
    });
    if (!created) {
      req.flash('form_error', text.form_error.duplicated);
    }
  } catch (err) {
    next(err);
  }
  res.redirect('/admin/genres');
};

exports.edit = async (req, res, next) => {
  let data;
  let page = 'genres';
  let edit;
  try {
    data = await Genre.findAll({
      order: [['name', 'ASC']],
    });
    edit = await Genre.findByPk(req.params.id);
    if (edit) {
      let action = `/admin/genres/${edit.id}?_method=PUT`;
      res.render('admin/generic_onefield', { action, data, page, title_page, edit, messages: req.flash() });
    } else {
      res.redirect('/admin/genres');
    }
  } catch (err) {
    next(err);
  }
};
exports.update = async (req, res, next) => {
  let id = req.params.id;
  let name = req.body.name.trim();
  try {
    let genre = await Genre.findOne({
      where: {
        name: {
          [Op.like]: name,
        },
        id: {
          [Op.ne]: id,
        },
      },
    });
    if (!genre) {
      await Genre.update(
        {
          name: name,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } else {
      req.flash('form_error', text.form_error.duplicated);
    }
  } catch (err) {
    next(err);
  }
  res.redirect('/admin/genres');
};

exports.delete = async (req, res, next) => {
  let id = req.params.id;
  try {
    await Genre.destroy({
      where: {
        id: id,
      },
    });
    res.redirect('/admin/genres/');
  } catch (err) {
    next(err);
  }
};
