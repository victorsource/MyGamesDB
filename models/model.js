const Sequelize = require('sequelize');
const options = { logging: false };

const sequelize = new Sequelize('sqlite:gamedb.sqlite', options);

// Initialize tables.
const Platform = require('./platform').init(sequelize);
const Developer = require('./developer').init(sequelize);
const Genre = require('./genre').init(sequelize);
const Franchise = require('./franchise').init(sequelize);
const Game = require('./game').init(sequelize);
// Relations
Platform.associate(sequelize.models);
Developer.associate(sequelize.models);
Genre.associate(sequelize.models);
Franchise.associate(sequelize.models);
Game.associate(sequelize.models);

module.exports = sequelize;
