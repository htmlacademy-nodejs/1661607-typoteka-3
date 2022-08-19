
'use strict';

const dayjs = require(`dayjs`);
const multer = require(`multer`);
const {readFile} = require(`fs`).promises;
const {nanoid} = require(`nanoid`);
const path = require(`path`);
const {PublicationDate, DATE_FORMAT, TextCount, FilePath, ID_LENGTH, ExitCode, HttpCode, ADMIN_ID} = require(`./const`);


const COMMENT_COUNT = 5;


const getTextListFromFile = async (filePath) => {
  const content = await readFile(filePath, `utf-8`);
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
const createRandomArray = (array, maxCount) => shuffle(array).slice(0, getRandomInt(1, maxCount));


const getTheEarliestDate = () => Date.now() - PublicationDate.MONTH_AGO * 1000 * 60 * 60 * 24 * 30;

const getFormatDate = (date) => dayjs(date).format(DATE_FORMAT);
const getDate = (date, format) => dayjs(date).format(format);

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


const asyncHandlerWrapper = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};


const prepareErrors = (error) => error.response.data.split(`\n`);

const validateData = (schema, data, res, next) => {
  const {error} = schema.validate(data, {abortEarly: false});
  if (error) {
    return res.status(HttpCode.BAD_REQUEST).send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};


const createImageUploader = (dir) => {
  const destination = path.resolve(__dirname, `./express/upload/img/${dir}`);

  const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
      const name = nanoid(10);
      const extension = file.originalname.split(`.`).pop();
      cb(null, `${name}.${extension}`);
    }
  });

  return multer({storage});
};

const adminMiddleware = (req, res, next) => {

  const {user} = req.session;

  if (user && user.id === ADMIN_ID) {
    return next();
  }
  return res.status(HttpCode.FORBIDDEN).redirect(`/`);
};


const getStringQuery = (rout, query) => `${rout}?${new URLSearchParams(query).toString()}`;

const emit = (req, eventName, data) => {
  const {io} = req.app.locals;
  io.emit(eventName, data);
};

const redirectWithErrors = (res, err, url) => {
  const errors = {err: err.response.data};
  const redirectUrl = getStringQuery(url || `/`, errors);
  res.redirect(redirectUrl);
};

const getErrorsFromQuery = (req) => {
  const err = req.query.err;
  return err ? err.split(`\n`) : null;
};


module.exports = {
  shuffle, getRandomInt,
  createPublicationList,
  createText, createTitle, getTextListFromFile, createRandomArray,
  getFormatDate, getDate,
  connectToDB,
  asyncHandlerWrapper,
  prepareErrors, validateData, adminMiddleware,
  createImageUploader,
  getStringQuery, redirectWithErrors, getErrorsFromQuery,
  emit
};
