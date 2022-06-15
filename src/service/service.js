'use strict';

const {Cli} = require(`./cli`);
const {Command} = require(`../const`);


const USER_ARGV_INDEX = 2;


const userArguments = process.argv.slice(USER_ARGV_INDEX);

const runCommand = (command) => Cli[command].run(userArguments);

Object.values(Command).forEach(runCommand);
