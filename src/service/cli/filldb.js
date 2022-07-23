'use strict';

const {red} = require(`chalk`);
const {connectToDB, getTextListFromFile, getRandomInt, createText, createTitle, createRandomArray} = require(`../../utils`);
const {Command, PublicationCount, ExitCode, FilePath, TextCount} = require(`../../const`);
const sequelize = require(`../lib/sequelize`);
const {getLogger} = require(`../lib/logger`);
const initDB = require(`../lib/init-db`);


const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};


const createComment = (comments) => ({text: createText(comments, TextCount.COMMENT)});
const createComments = (count, comments) => new Array(count).fill(null).map(() => createComment(comments));

const getPictureFileName = (number) => `pic-${number.toString().padStart(2, 0)}.jpg`;

const generateArticles = (count, titles, categories, texts, comments, users) => (
  Array(count).fill(null).map(() => ({
    title: createTitle(titles),
    categories: createRandomArray(categories, TextCount.CATEGORY),
    comments: createComments(getRandomInt(1, TextCount.COMMENT), comments),
    announce: createText(texts, TextCount.ANNOUNCE),
    fullText: createText(texts, TextCount.FULL_TEXT),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),

    user: users[getRandomInt(0, users.length - 1)].email
  }))
);

exports.fillDB = {
  name: Command.FILL_DB,

  async run(args) {

    const logger = getLogger({name: `api/fillDB`});

    connectToDB(sequelize, logger);

    const texts = await getTextListFromFile(FilePath.SENTENCES);
    const titles = await getTextListFromFile(FilePath.TITLES);
    const categories = await getTextListFromFile(FilePath.CATEGORIES);
    const comments = await getTextListFromFile(FilePath.COMMENTS);

    const users = [
      {
        name: `user 1`,
        email: `1@example.com`,
        passwordHash: `passwordHash1`,
        avatar: `avatar01.jpg`
      },
      {
        name: `user 2`,
        email: `2@example.com`,
        passwordHash: `passwordHash2`,
        avatar: `avatar02.jpg`
      },
      {
        name: `user 3`,
        email: `3@example.com`,
        passwordHash: `passwordHash3`,
        avatar: `avatar03.jpg`
      }
    ];

    const count = +args || 1;


    if (count && count > PublicationCount.MAX) {
      console.error(red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.ERROR);
    }


    const articles = generateArticles(count, titles, categories, texts, comments, users);

    return initDB(sequelize, {articles, categories, users});
  }
};

