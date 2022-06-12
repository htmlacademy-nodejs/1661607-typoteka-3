'use strict';

const {version} = require(`../../../package.json`);
const {Command} = require(`../../const`);


exports.version = {
  name: Command.Version,
  run() {
    return console.info(version);
  }
};
