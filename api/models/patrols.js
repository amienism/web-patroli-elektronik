'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patrols extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      patrols.hasOne(models.users, {foreignKey: 'user_id'});
      patrols.belongsTo(models.users, {foreignKey: 'user_id'});

      patrols.hasOne(models.patrol_locations, {foreignKey: 'location_id'})
      patrols.belongsTo(models.patrol_locations, {foreignKey: 'location_id'})
    }
  }
  patrols.init({
    patrol_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    scan_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'patrol',
  });
  return patrols;
};