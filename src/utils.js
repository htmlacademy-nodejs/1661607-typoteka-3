
'use strict';

const dayjs = require(`dayjs`);
const {readFile} = require(`fs`).promises;
const {nanoid} = require(`nanoid`);
const {PublicationDate, DATE_FORMAT, TextCount, FilePath, ID_LENGTH, ExitCode} = require(`./const`);


const COMMENT_COUNT = 5;


const getTextListFromFile = async (path) => {
  const content = await readFile(path, `utf-8`);
  return content.trim().split(`\n`);
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const shuffle = (someArray) => {
  // console.log(someArray);
  const copiedArray = [...someArray];
  for (let i = copiedArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [copiedArray[i], copiedArray[randomPosition]] = [copiedArray[randomPosition], copiedArray[i]];
  }

  return copiedArray;
};


const createTitle = (titles) => titles[getRandomInt(1, titles.length - 1)];


const createText = (texts, maxLength) => shuffle(texts).slice(0, getRandomInt(1, maxLength)).join(` `);


const createCategories = (categories) => shuffle(categories).slice(0, getRandomInt(1, TextCount.CATEGORY));


const getTheEarliestDate = () => Date.now() - PublicationDate.MONTH_AGO * 1000 * 60 * 60 * 24 * 30;

const getFormatDate = (date) => dayjs(date).format(DATE_FORMAT);

const createdRandomDate = () => {
  const lastStamp = Date.now();
  const firstStamp = getTheEarliestDate();
  const randomDate = getRandomInt(lastStamp, firstStamp);

  return getFormatDate(randomDate);
};

const createComment = (comments) => ({
  id: nanoid(ID_LENGTH),
  text: createText(comments, TextCount.COMMENT),
  date: createdRandomDate()
});


const createPublication = ({titles, texts, categories, commentList}) => {
  const id = nanoid(ID_LENGTH);
  const announce = createText(texts, TextCount.ANNOUNCE);
  const category = createCategories(categories);
  const createdDate = createdRandomDate();
  const fullText = createText(texts, TextCount.FULL_TEXT);
  const title = createTitle(titles);
  const comments = new Array(getRandomInt(0, COMMENT_COUNT)).fill(null).map(() => createComment(commentList));
  return {id, title, announce, fullText, createdDate, category, comments};
};


const createPublicationList = async (count) => {
  const titles = await getTextListFromFile(FilePath.TITLES);
  const texts = await getTextListFromFile(FilePath.SENTENCES);
  const categories = await getTextListFromFile(FilePath.CATEGORIES);
  const commentList = await getTextListFromFile(FilePath.COMMENTS);

  return Array(count).fill(null).map(() => createPublication({titles, texts, categories, commentList}));
};


const render = (template, content) => (req, res) => res.render(template, content);

const checkFields = (needFields, fields) => needFields.every((field) => fields.includes(field));


const connectToDB = async (sequelize, logger) => {
  try {
    logger.info(`trying to connect to DB`);
    await sequelize.authenticate();
    logger.info(`success connection to DB`);
  } catch (err) {
    logger.error(`cannot connect to DB, error: ${err.message}`);
    process.exit(ExitCode.ERROR);
  }
};


module.exports = {
  shuffle, getRandomInt,
  createText, createTitle, getTextListFromFile,
  render,
  checkFields, getFormatDate,
  connectToDB,
};
