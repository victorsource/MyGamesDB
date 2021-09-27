const db = require('../models/model');
const Developer = db.models.Developer;
const { Op } = require('sequelize');
const text = require('../cfg/lang').back.devs;

const title_page = text.title;

exports.index = async (req, res, next) => {
  let action = '/admin/devs/add';
  let page = 'devs';
  let data;
  try {
    data = await Developer.findAll({
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
    const [developer, created] = await Developer.findOrCreate({
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
  res.redirect('/admin/devs');
};

exports.edit = async (req, res, next) => {
  let data;
  let page = 'devs';
  let edit;
  try {
    data = await Developer.findAll({
      order: [['name', 'ASC']],
    });
    edit = await Developer.findByPk(req.params.id);
    if (edit) {
      let action = `/admin/devs/${edit.id}?_method=PUT`;
      res.render('admin/generic_onefield', { action, data, page, title_page, edit, messages: req.flash() });
    } else {
      res.redirect('/admin/devs');
    }
  } catch (err) {
    next(err);
  }
};
exports.update = async (req, res, next) => {
  let id = req.params.id;
  let name = req.body.name.trim();
  try {
    let dev = await Developer.findOne({
      where: {
        name: {
          [Op.like]: name,
        },
        id: {
          [Op.ne]: id,
        },
      },
    });
    if (!dev) {
      await Developer.update(
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
  res.redirect('/admin/devs');
};

exports.delete = async (req, res, next) => {
  let id = req.params.id;
  try {
    await Developer.destroy({
      where: {
        id: id,
      },
    });
    res.redirect('/admin/devs/');
  } catch (err) {
    next(err);
  }
};
