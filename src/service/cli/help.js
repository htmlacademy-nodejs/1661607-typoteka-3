'use strict';

const {gray} = require(`chalk`);
const {Command} = require(`../../const`);

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
      `
    ))
    ;
  }
};
