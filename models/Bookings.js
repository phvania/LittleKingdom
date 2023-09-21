const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bookings extends Model {}

Bookings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Bookings_time: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    Bookings_date: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Bookings_type: {
      type: DataTypes.STRING,
      allowNull: false,

      
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kid_id: {
      type: DataTypes.STRING,
      unique: true
          
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Bookings',
  }
);

module.exports = Bookings;
