'use strict';

const {Cli} = require(`./cli`);
const {ExitCode, Command, PublicationCount} = require(`../const`);


const USER_ARGV_INDEX = 2;


const userArguments = process.argv.slice(USER_ARGV_INDEX);

const [userCommand] = userArguments;

if (!userArguments.length || !Cli[userCommand] || userCommand === Command.HELP) {
  Cli[Command.HELP].run();
} else if (userCommand === Command.VERSION) {
  Cli[userCommand].run();
} else {
  const count = +userArguments.slice(1)[0] || PublicationCount.MIN;
  if (count > PublicationCount.MAX) {
    console.error(`Не больше 1000 публикаций`);
    process.exit(ExitCode.ERROR);
  }

  Cli[userCommand].run(count);
}


