'use strict';

const dayjs = require(`dayjs`);


const {PublicationDate, DATE_FORMAT, TITLES, TEXTS, TextCount, CATEGORIES} = require(`./const`);


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


const createTitle = () => TITLES[getRandomInt(1, TITLES.length - 1)];


const createText = (maxLength) => shuffle(TEXTS).slice(0, getRandomInt(1, maxLength)).join(` `);


const createCategories = () => shuffle(CATEGORIES).slice(0, getRandomInt(1, TextCount.CATEGORY));


const getTheEarliestDare = () => Date.now() - PublicationDate.MONTH_AGO * 1000 * 60 * 60 * 24 * 30;


const createdRandomDate = () => {
  const lastStamp = Date.now();
  const firstStamp = getTheEarliestDare();

  const randomDate = getRandomInt(lastStamp, firstStamp);

  return dayjs(randomDate).format(DATE_FORMAT);
};


const createPublication = () => {
  const announce = createText(TextCount.ANNOUNCE);
  const category = createCategories();
  const createdDate = createdRandomDate();
  const fullText = createText(TextCount.FULL_TEXT);
  const title = createTitle();

  return {title, announce, fullText, createdDate, category};
};


const createPublicationList = (count) => Array(count).fill(null).map(createPublication);


module.exports = {createPublicationList};
