'use strict';

const {writeFile} = require(`fs`);
const {createPublicationList} = require(`../../utils`);
const {WRITE_FILE_NAME, Command} = require(`../../const`);


exports.generate = {
  name: Command.GENERATE,
  run(count) {

    const publicationList = JSON.stringify(createPublicationList(count));

    writeFile(WRITE_FILE_NAME, publicationList, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File "${WRITE_FILE_NAME}" created.`);
    });
  }
};
