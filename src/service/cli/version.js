'use strict';

const {blue} = require(`chalk`);
const {version} = require(`../../../package.json`);
const {Command} = require(`../../const`);


exports.version = {
  name: Command.VERSION,
  run() {
    console.info(blue(version));
  }
};
