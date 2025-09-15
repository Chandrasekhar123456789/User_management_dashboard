const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.DATABASE_URL) {
  // Use Postgres on Render
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Render Postgres needs this
      },
    },
    logging: false,
  });
} else {
  // Use SQLite locally
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
  });
}

// Import model
const User = require("./User");
User.initModel(sequelize);

module.exports = { sequelize, User };


