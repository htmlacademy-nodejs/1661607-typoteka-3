'use strict';

const Sequelize = require(`sequelize`);

const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD} = process.env;
console.log(`!!--------- `, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, ` -------------!!`);

if (!(DB_HOST && DB_PORT && DB_NAME && DB_USER && DB_PASSWORD)) {
  throw Error(`One or more environmental variables are not defined`);
}

module.exports = new Sequelize(
    DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: `postgres`,
      poll: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 10000
      }
    }
);
