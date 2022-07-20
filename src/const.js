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
  SERVER: `--server`,
  FILL_DB: `--fillDB`
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
  SEARCH: `search`,
  ERR_404: `errors/404`,
  ERR_500: `errors/500`
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const ID_LENGTH = 8;

const ServerRoute = {
  ARTICLES: `/articles`,
  CATEGORY: `/category`,
  SEARCH: `/search`
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

const Aliase = {
  CATEGORIES: `categories`,
  COMMENTS: `comments`,
  ARTICLES: `articles`,
  ARTICLE_CATEGORIES: `articleCategories`
};

const JoiMessageKey = {
  STRING_MIN: `string.min`,
  STRING_MAX: `string.max`,
  STRING_EMPTY: `string.empty`,
  REQUIRED: `any.required`,
  NUMBER_MIN: `number.min`,
  NUMBER_BASE: `number.base`,
};


module.exports = {
  ID_LENGTH, DATE_FORMAT, WRITE_FILE_NAME,
  Template, ExitCode, PublicationCount, TextCount, PublicationDate, Command, FilePath, HttpCode, ServerRoute, Env,
  Aliase,
  JoiMessageKey
};
