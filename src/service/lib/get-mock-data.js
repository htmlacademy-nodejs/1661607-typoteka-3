'use strict';

const {readFile} = require(`fs`).promises;
const {red} = require(`chalk`);
const {FilePath} = require(`../../const`);


let mocks = [];


module.exports = async () => {
  if (!mocks.length) {
    try {
      const content = await readFile(FilePath.MOCKS, `utf-8`);
      mocks = JSON.parse(content);
    } catch (err) {
      console.error(red(err));
    }
  }

  return mocks;
};
