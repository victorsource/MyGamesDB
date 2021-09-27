const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const platformController = require('../controllers/platformController');
const genreController = require('../controllers/genreController');
const developerController = require('../controllers/developerController');
const franchiseController = require('../controllers/franchiseController');
const gameController = require('../controllers/gameController');

router.get('/admin', adminController.index);

// platform routes
router.get('/admin/platforms', platformController.index);
router.post('/admin/platforms/add', platformController.create);
router.get('/admin/platforms/:id/edit', platformController.edit);
router.put('/admin/platforms/:id', platformController.update);
router.delete('/admin/platforms/:id', platformController.delete);

// genres routes
router.get('/admin/genres', genreController.index);
router.post('/admin/genres/add', genreController.create);
router.get('/admin/genres/:id/edit', genreController.edit);
router.put('/admin/genres/:id', genreController.update);
router.delete('/admin/genres/:id', genreController.delete);

// devs routes
router.get('/admin/devs', developerController.index);
router.post('/admin/devs/add', developerController.create);
router.get('/admin/devs/:id/edit', developerController.edit);
router.put('/admin/devs/:id', developerController.update);
router.delete('/admin/devs/:id', developerController.delete);

// franchise routes
router.get('/admin/franchise', franchiseController.index);
router.post('/admin/franchise/add', franchiseController.create);
router.get('/admin/franchise/:id/edit', franchiseController.edit);
router.put('/admin/franchise/:id', franchiseController.update);
router.delete('/admin/franchise/:id', franchiseController.delete);

// games routes
router.get('/admin/games/add', gameController.index);
router.post('/admin/games/add', gameController.create);
router.get('/admin/games/', gameController.game_list);
router.get('/admin/games/:id/edit', gameController.edit);
router.put('/admin/games/:id', gameController.update);
router.delete('/admin/games/:id', gameController.delete);

module.exports = router;
