'use strict';

const {Cli} = require(`./cli`);
const {Command} = require(`../const`);


const USER_ARGV_INDEX = 2;


const userArguments = process.argv.slice(USER_ARGV_INDEX);

const [userCommand, param] = userArguments;

if (!userArguments.length || !Cli[userCommand] || userCommand === Command.HELP) {
  Cli[Command.HELP].run();
} else if (userCommand === Command.VERSION) {
  Cli[userCommand].run();
} else if (userCommand === Command.SERVER) {
  Cli[userCommand].run(+param);
} else {
  Cli[userCommand].run(+param);
}
