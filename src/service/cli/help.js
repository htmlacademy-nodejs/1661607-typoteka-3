'use strict';

const {Command} = require(`../../const`);


exports.help = {
  name: Command.HELP,
  run() {
    console.info(
        `
      Гайд:
      service.js <command>
      Команды:
      --version:            выводит номер версии
      --help:               печатает этот текст
      --generate <count>    формирует файл mocks.json
      `
    )
    ;
  }
};
