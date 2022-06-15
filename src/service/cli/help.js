'use strict';

const {gray} = require(`chalk`);
const {Command} = require(`../../const`);


exports.help = {
  name: Command.HELP,
  run(args) {
    const [command] = args;

    if (Object.values(Command).includes(command) && command !== Command.HELP) {
      return;
    }

    console.info(gray(
        `
      Гайд:
      service.js <command>
      Команды:
      --version:            выводит номер версии
      --help:               печатает этот текст
      --generate <count>    формирует файл mocks.json
      `
    ))
    ;
  }
};
