const Sequelize = require('sequelize');

class Franchise extends Sequelize.Model {
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
        modelName: 'Franchise',
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Game);
  }
}

module.exports = Franchise;
