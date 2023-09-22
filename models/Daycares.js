const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Daycares extends Model {}
Daycares.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    daycare_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    daycare_description: {
      type: DataTypes.TEXT,
    },
    daycare_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    daycare_phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    daycare_contact_name: {
      type: DataTypes.STRING,
      unique: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'daycares',
  }
);

module.exports = Daycares;
