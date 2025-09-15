
// backend/src/models/index.js
const { Sequelize } = require("sequelize");

// Use DATABASE_URL from environment if provided (Render/Postgres)
// Otherwise default to SQLite (local development)
const sequelize = new Sequelize(
  process.env.DATABASE_URL || {
    dialect: "sqlite",
    storage: "./database.sqlite",
  },
  {
    logging: false, // disable SQL logs in console
  }
);

// Import the User model
const User = require("./User");

// Initialize the model with Sequelize instance
User.initModel(sequelize);

// Export everything
module.exports = {
  sequelize,
  User,
};
