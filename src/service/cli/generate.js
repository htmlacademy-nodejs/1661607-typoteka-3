'use strict';

const {writeFile} = require(`fs`).promises;
const {red, green} = require(`chalk`);
const {createPublicationList} = require(`../../utils`);
const {WRITE_FILE_NAME, Command} = require(`../../const`);


exports.generate = {
  name: Command.GENERATE,
  async run(count) {

    const publicationList = JSON.stringify(createPublicationList(count));

    try {
      await writeFile(WRITE_FILE_NAME, publicationList);
      return console.info(green(`Operation success. File "${WRITE_FILE_NAME}" created.`));
    } catch (err) {
      return console.error(red(`Can't write data to file... ${err}`));
    }
  }
};
