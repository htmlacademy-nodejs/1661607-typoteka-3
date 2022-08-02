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
const ARTICLE_DATE_FORMAT = `DD.MM.YYYY, HH:MM`;

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
  EDIT: `edit-article`,
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
  COMMENTS: `/articles/comments`,
  CATEGORY: `/category`,
  SEARCH: `/search`,
  USER: `/user`,
  AUTH: `/user/auth`
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

const Aliase = {
  CATEGORIES: `categories`,
  COMMENTS: `comments`,
  ARTICLES: `articles`,
  ARTICLE_CATEGORIES: `article_categories`,
  USERS: `users`
};

const JoiMessageKey = {
  STRING_MIN: `string.min`,
  STRING_MAX: `string.max`,
  STRING_EMPTY: `string.empty`,
  REQUIRED: `any.required`,
  ANY_ONLY: `any.only`,
  NUMBER_MIN: `number.min`,
  NUMBER_BASE: `number.base`,
  REGEXP: `string.pattern.base`,
  EMAIL: `string.email`
};

const LIMIT_ARTICLES = 8;
const LIMIT_COMMENTS = 4;


const ADMIN_ID = 4;


const NOT_DROP_CATEGORY_MESSAGE = `cannot be deleted. there are articles in this category`;

module.exports = {
  ID_LENGTH, DATE_FORMAT, ARTICLE_DATE_FORMAT, WRITE_FILE_NAME,
  LIMIT_ARTICLES, LIMIT_COMMENTS,
  Template, ExitCode, PublicationCount, TextCount, PublicationDate, Command, FilePath, HttpCode, ServerRoute, Env,
  Aliase,
  JoiMessageKey, ADMIN_ID,
  NOT_DROP_CATEGORY_MESSAGE
};
