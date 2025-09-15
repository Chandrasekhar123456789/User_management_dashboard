// backend/src/models/User.js
const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: { isEmail: true },
        },
        role: {
          type: DataTypes.STRING,
          defaultValue: "user",
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
      }
    );
  }
}

module.exports = User;
