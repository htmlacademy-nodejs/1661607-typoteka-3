'use strict';

const dayjs = require(`dayjs`);


const {PublicationDate, DATE_FORMAT, TITLES, TEXTS, TextCount, CATEGORIES} = require(`./const`);


const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};


const createTitle = () => TITLES[getRandomInt(1, TITLES.length - 1)];


const createText = (maxLength) => shuffle(TEXTS).slice(0, getRandomInt(1, maxLength)).join(` `);


const createCategories = () => shuffle(CATEGORIES).slice(0, getRandomInt(1, TextCount.Category));


const getTheEarliestDare = () => Date.now() - PublicationDate.MonthAgo * 1000 * 60 * 60 * 24 * 30;


const createdRandomDate = () => {
  const lastStamp = Date.now();
  const firstStamp = getTheEarliestDare();

  const randomDate = getRandomInt(lastStamp, firstStamp);

  return dayjs(randomDate).format(DATE_FORMAT);
};


const createPublication = () => {
  const announce = createText(TextCount.Announce);
  const category = createCategories();
  const createdDate = createdRandomDate();
  const fullText = createText(TextCount.FullText);
  const title = createTitle();

  return {title, announce, fullText, createdDate, category};
};


const createPublicationList = (count) => Array(count).fill(null).map(createPublication);


module.exports = {createPublicationList};
