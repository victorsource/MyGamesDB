const db = require('../models/model');
const Platform = db.models.Platform;
const { Op } = require('sequelize');
const text = require('../cfg/lang').back.platform;

const title_page = text.title;

exports.index = async (req, res, next) => {
  let action = '/admin/platforms/add';
  let page = 'platforms';
  let data;
  try {
    data = await Platform.findAll({
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
    const [platform, created] = await Platform.findOrCreate({
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
  res.redirect('/admin/platforms');
};

exports.edit = async (req, res, next) => {
  let data;
  let page = 'platforms';
  let edit;
  try {
    data = await Platform.findAll({
      order: [['name', 'ASC']],
    });
    edit = await Platform.findByPk(req.params.id);
    if (edit) {
      let action = `/admin/platforms/${edit.id}?_method=PUT`;
      res.render('admin/generic_onefield', { action, data, page, title_page, edit, messages: req.flash() });
    } else {
      res.redirect('/admin/platforms');
    }
  } catch (err) {
    next(err);
  }
};
exports.update = async (req, res, next) => {
  let id = req.params.id;
  let name = req.body.name.trim();
  try {
    let platform = await Platform.findOne({
      where: {
        name: {
          [Op.like]: name
        },
        id: {
          [Op.ne]: id
        }
      },
    });    
    if (!platform) {
      await Platform.update(
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
  res.redirect('/admin/platforms');
};

exports.delete = async (req, res, next) => {
  let id = req.params.id;
  try {
    await Platform.destroy({
      where: {
        id: id,
      },
    });
    res.redirect('/admin/platforms/');
  } catch (err) {
    next(err);
  }
};
