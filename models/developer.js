const Sequelize = require('sequelize');

class Developer extends Sequelize.Model {
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
        modelName: 'Developer',
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Game, {
      through: 'GamesDevelopers',
    });
  }
}

module.exports = Developer;
