'use strict';

const {writeFile} = require(`fs`).promises;
const {red, green} = require(`chalk`);
const {createPublicationList} = require(`../../utils`);
const {WRITE_FILE_NAME, Command, PublicationCount, ExitCode} = require(`../../const`);


exports.generate = {
  name: Command.GENERATE,
  async run(count) {

    if (count && count > PublicationCount.MAX) {
      console.error(red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.ERROR);
    }

    // const publicationListObject = await createPublicationList(count || 1);
    // console.log(x, `x`);

    const publicationList = JSON.stringify(await createPublicationList(count || 1));

    try {
      await writeFile(WRITE_FILE_NAME, publicationList);
      return console.info(green(`Operation success. File "${WRITE_FILE_NAME}" created.`));
    } catch (err) {
      return console.error(red(`Can't write data to file... ${err}`));
    }
  }
};
