'use strict';

const {Cli} = require(`./cli`);
const {ExitCode, Command, PublicationCount} = require(`../const`);


const USER_ARGV_INDEX = 2;


const userArguments = process.argv.slice(USER_ARGV_INDEX);

const [userCommand] = userArguments;

if (!userArguments.length || !Cli[userCommand] || userCommand === Command.Help) {
  Cli[Command.Help].run();
  process.exit(ExitCode.Success);
}

if (userCommand === Command.Version) {
  Cli[userCommand].run();
  process.exit(ExitCode.Success);
}

if (userCommand === Command.Generate) {

  const count = +userArguments.slice(1)[0] || PublicationCount.Min;

  if (count > PublicationCount.Max) {
    console.error(`Не больше 1000 публикаций`);
    process.exit(ExitCode.Error);
  }

  Cli[userCommand].run(count);
}


