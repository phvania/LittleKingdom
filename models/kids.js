const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Kids extends Model {}
  
Kids.init(
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
        
    },
    allergies: {
      type: DataTypes.STRING,
         
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'kids',
            key: 'id'
        }
      }
    },
  
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'kids',
  }
);

module.exports = Kids;
