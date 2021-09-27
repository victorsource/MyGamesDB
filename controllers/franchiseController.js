const db = require('../models/model');
const Franchise = db.models.Franchise;
const { Op } = require('sequelize');
const text = require('../cfg/lang').back.franchise;

const title_page = text.title;

exports.index = async (req, res, next) => {
  let action = '/admin/franchise/add';
  let page = 'franchise';
  let data;
  try {
    data = await Franchise.findAll({
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
    const [franchise, created] = await Franchise.findOrCreate({
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
  res.redirect('/admin/franchise');
};

exports.edit = async (req, res, next) => {
  let data;
  let page = 'franchise';
  let edit;
  try {
    data = await Franchise.findAll({
      order: [['name', 'ASC']],
    });
    edit = await Franchise.findByPk(req.params.id);
    if (edit) {
      let action = `/admin/franchise/${edit.id}?_method=PUT`;
      res.render('admin/generic_onefield', { action, data, page, title_page, edit, messages: req.flash() });
    } else {
      res.redirect('/admin/franchise');
    }
  } catch (err) {
    next(err);
  }
};
exports.update = async (req, res, next) => {
  let id = req.params.id;
  let name = req.body.name.trim();
  try {
    let franchise = await Franchise.findOne({
      where: {
        name: {
          [Op.like]: name,
        },
        id: {
          [Op.ne]: id,
        },
      },
    });
    if (!franchise) {
      await Franchise.update(
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
  res.redirect('/admin/franchise');
};

exports.delete = async (req, res, next) => {
  let id = req.params.id;
  try {
    await Franchise.destroy({
      where: {
        id: id,
      },
    });
    res.redirect('/admin/franchise/');
  } catch (err) {
    next(err);
  }
};
