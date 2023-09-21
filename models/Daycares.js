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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact_name: {
      type: DataTypes.STRING,
      unique: true
          
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
