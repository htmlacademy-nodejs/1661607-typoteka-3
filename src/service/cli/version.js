'use strict';

const {blue} = require(`chalk`);
const {version} = require(`../../../package.json`);
const {Command} = require(`../../const`);


exports.version = {
  name: Command.VERSION,
  run(args) {

    const [command] = args;

    if (command === Command.VERSION) {
      console.info(blue(version));
    }
  }
};
