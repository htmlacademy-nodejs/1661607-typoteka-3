'use strict';

const {gray} = require(`chalk`);
const {Command} = require(`../../const`);


// "start-front-server": "nodemon ./src/express/express.js",
// "start": "cross-env NODE_ENV=production NODE_DB=true node -r dotenv/config ./src/service/service.js --server",
// "start::debug": "cross-env NODE_ENV=development NODE_DB=true nodemon -r dotenv/config ./src/service/service.js --server",
// "filldb": "cross-env NODE_DB=true node -r dotenv/config  ./src/service/service.js --fillDB",

// "version": "node ./src/service/service.js --version",

exports.help = {
  name: Command.HELP,
  run() {

    console.info(gray(
        `
      Гайд:
      service.js <command>
      Команды:
      --version:            выводит номер версии
      --help:               печатает этот текст
      --filldb <count>      заполняет БД 
      `
    ))
    ;
  }
};
