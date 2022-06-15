'use strict';

const {writeFile} = require(`fs`).promises;
const {red, green} = require(`chalk`);
const {createPublicationList} = require(`../../utils`);
const {WRITE_FILE_NAME, Command, PublicationCount, ExitCode} = require(`../../const`);


exports.generate = {
  name: Command.GENERATE,
  async run(args) {

    const [command, consoleCount] = args;

    if (command !== Command.GENERATE) {
      return;
    }

    const count = +consoleCount || 1;

    if (count && count > PublicationCount.MAX) {
      console.error(red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const publicationList = JSON.stringify(await createPublicationList(count || 1));

    try {
      await writeFile(WRITE_FILE_NAME, publicationList);
      console.info(green(`Operation success. File "${WRITE_FILE_NAME}" created.`));
    } catch (err) {
      console.error(red(`Can't write data to file... ${err}`));
      process.exit(ExitCode.ERROR);
    }
  }
};
