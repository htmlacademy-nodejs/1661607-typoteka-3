'use strict';

const {version} = require(`../../../package.json`);
const {Command} = require(`../../const`);


exports.version = {
  name: Command.VERSION,
  run() {
    return console.info(version);
  }
};
