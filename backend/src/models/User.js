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
          validate: { isEmail: true },
        },
        phone: {
          type: DataTypes.STRING,
        },
        company: {
          type: DataTypes.STRING,
        },
        street: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        zip: { type: DataTypes.STRING },
        lat: { type: DataTypes.FLOAT },
        lng: { type: DataTypes.FLOAT },
      },
      {
        sequelize,
        modelName: "User",
      }
    );
  }
}

module.exports = User;
