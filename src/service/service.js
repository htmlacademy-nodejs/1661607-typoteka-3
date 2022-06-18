'use strict';

const {Cli} = require(`./cli`);
const {Command} = require(`../const`);


const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = Command.HELP;


const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [command, arg] = userArguments;

if (Cli[command]) {
  Cli[command].run(arg);
} else {
  Cli[DEFAULT_COMMAND].run();
}
