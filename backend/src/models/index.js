const { Sequelize } = require('sequelize');
const path = require('path');

const dialect = process.env.DB_DIALECT || 'sqlite';

let sequelize;
if (dialect === 'sqlite') {
  const storage = process.env.DB_STORAGE || path.join(__dirname, '..', '..', 'db.sqlite');
  sequelize = new Sequelize({ dialect: 'sqlite', storage, logging: false });
} else {
  // postgres
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  });
}

const User = require("./User");
(sequelize);

module.exports = { sequelize, User };
