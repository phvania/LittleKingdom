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
    bookings_time: {
      type: DataTypes.TIME,
      unique: false,
    },
    bookings_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    bookings_type: {
      type: DataTypes.STRING,
      // defaultValue: 'FT',
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    kid_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'kids',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bookings',
  }
);

module.exports = Bookings;
