
'use strict';

const dayjs = require(`dayjs`);
const {readFile} = require(`fs`).promises;
const {PublicationDate, DATE_FORMAT, TextCount, FilePath} = require(`./const`);


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


const createdRandomDate = () => {
  const lastStamp = Date.now();
  const firstStamp = getTheEarliestDate();
  const randomDate = getRandomInt(lastStamp, firstStamp);

  return dayjs(randomDate).format(DATE_FORMAT);
};


const createPublication = ({titles, texts, categories}) => {
  const announce = createText(texts, TextCount.ANNOUNCE);
  const category = createCategories(categories);
  const createdDate = createdRandomDate();
  const fullText = createText(texts, TextCount.FULL_TEXT);
  const title = createTitle(titles);

  return {title, announce, fullText, createdDate, category};
};


const createPublicationList = async (count) => {
  const titles = await getTextListFromFile(FilePath.TITLES);
  const texts = await getTextListFromFile(FilePath.SENTENCES);
  const categories = await getTextListFromFile(FilePath.CATEGORIES);

  return Array(count).fill(null).map(() => createPublication({titles, texts, categories}));
};


module.exports = {createPublicationList};
