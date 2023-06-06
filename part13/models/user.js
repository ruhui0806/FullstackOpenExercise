const { Model, DataTypes } = require("sequelize");

const sequelize = require("../utils/db");

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNullValues: false, unique: true },
    name: { type: DataTypes.STRING, allowNullValues: false },
  },
  { sequelize, underscored: true, timestamps: true, modelName: "user" }
);
module.exports = User;
