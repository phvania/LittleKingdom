const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Kids extends Model { }

Kids.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    kid_firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kid_lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kid_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kid_allergies: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'kids',
  }
);

module.exports = Kids;
