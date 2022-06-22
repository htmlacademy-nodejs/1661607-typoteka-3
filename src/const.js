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
  CATEGORY: 4,
  COMMENT: 5,
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
  COMMENTS: `./data/comments.txt`,
  MOCKS: `./mocks.json`
};


const Template = {
  ARTICLES_BY_CATEGORY: `articles-by-category`,
  POST: `post`,
  POST_DETAIL: `post-detail`,
  MY: `my`,
  ALL_CATEGORIES: `all-categories`,
  COMMENTS: `comments`,
  MAIN: `main`,
  SIGN_UP: `sign-up`,
  LOGIN: `login`,
  SEARCH: `search`
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
};


module.exports = {
  Template, ExitCode, PublicationCount, TextCount, PublicationDate, DATE_FORMAT, WRITE_FILE_NAME, Command, FilePath, HttpCode
};
