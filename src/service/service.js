'use strict';
const {Cli} = require(`./cli`);
const {Command} = require(`../const`);


const USER_ARGV_INDEX = 2;


const userArguments = process.argv.slice(USER_ARGV_INDEX);

const [userCommand, countPublication] = userArguments;

if (!userArguments.length || !Cli[userCommand] || userCommand === Command.HELP) {
  Cli[Command.HELP].run();
} else if (userCommand === Command.VERSION) {
  Cli[userCommand].run();
} else {
  Cli[userCommand].run(+countPublication);
}
