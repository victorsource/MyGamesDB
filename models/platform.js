const Sequelize = require('sequelize');

class Platform extends Sequelize.Model {
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
        modelName: 'Platform',
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Game, {
      through: 'GamesPlatforms',
    });
  }
}

module.exports = Platform;
