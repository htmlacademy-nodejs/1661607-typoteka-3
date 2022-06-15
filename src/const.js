'use strict';

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const PublicationCount = {
  MIN: 1,
  MAX: 1000,
};

const TextCount = {
  ANNOUNCE: 5,
  FULL_TEXT: 25,
  CATEGORY: 4
};

const PublicationDate = {
  MONTH_AGO: 3,
};

const DATE_FORMAT = `YYYY-MM-DD HH:MM:ss`;

const WRITE_FILE_NAME = `mocks.json`;

const Command = {
  VERSION: `--version`,
  HELP: `--help`,
  GENERATE: `--generate`,
  SERVER: `--server`
};

const FilePath = {
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  MOCKS: `./mocks.json`
};

module.exports = {
  ExitCode, PublicationCount, TextCount, PublicationDate, DATE_FORMAT, WRITE_FILE_NAME, Command, FilePath
};
