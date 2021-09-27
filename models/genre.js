const Sequelize = require('sequelize');

class Genre extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Genre',
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Game, {
      through: 'GamesGenres',
    });
  }
}

module.exports = Genre;
