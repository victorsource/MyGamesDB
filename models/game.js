const Sequelize = require('sequelize');

class Game extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        altNames: Sequelize.STRING,
        image: Sequelize.BLOB,
        description: Sequelize.TEXT,
        comments: Sequelize.TEXT,
        eurDate: {
          type: Sequelize.DATEONLY,
          defaultValue: new Date(1900, 0, 1),
        },
        naDate: {
          type: Sequelize.DATEONLY,
          defaultValue: new Date(1900, 0, 1),
        },
        jpDate: {
          type: Sequelize.DATEONLY,
          defaultValue: new Date(1900, 0, 1),
        },
      },
      {
        sequelize,
        modelName: 'Game',
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Platform, {
      through: 'GamesPlatforms',
    });
    this.belongsToMany(models.Developer, {
      through: 'GamesDevelopers',
    });
    this.belongsToMany(models.Genre, {
      through: 'GamesGenres',
    });
    this.belongsTo(models.Franchise);
  }
}

module.exports = Game;
