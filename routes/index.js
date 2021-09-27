const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);
router.get('/platform/:id', indexController.games_platform);
router.get('/game/:id', indexController.game);
router.get('/games/search', indexController.search);
module.exports = router;
