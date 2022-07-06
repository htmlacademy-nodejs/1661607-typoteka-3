'use strict';

const {red, green} = require(`chalk`);
const {connectToDB, getTextListFromFile, shuffle, getRandomInt, createText, createTitle} = require(`../../utils`);
const {Command, PublicationCount, ExitCode, FilePath, TextCount, Aliase} = require(`../../const`);
const sequelize = require(`../lib/sequelize`);
const {getLogger} = require(`../lib/logger`);
const defineModels = require(`../models`);


const createRandomCategories = (categories) => shuffle(categories).slice(0, getRandomInt(1, TextCount.CATEGORY));

const createCategories = (categories) => shuffle(categories).slice(0, getRandomInt(1, TextCount.CATEGORY));
const createComments = (comments) => shuffle(comments).slice(0, getRandomInt(1, TextCount.COMMENT));

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const getRandomSubarray = (items) => {
  // console.log(items);
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
        ...items.splice(
            getRandomInt(0, items.length - 1), 1
        )
    );
  }
  return result;
};

const createPublication = ({titles, texts, categoryModels, commentList}) => {
  // console.log()
  const announce = createText(texts, TextCount.ANNOUNCE);
  const categories = getRandomSubarray(categoryModels);//
  const fullText = createText(texts, TextCount.FULL_TEXT);
  const title = createTitle(titles);
  const comments = getRandomSubarray(commentList); //
  const picture = getPictureFileName(getRandomInt(1, 16));

  return {title, announce, fullText, categories, comments, picture};
};


exports.fillDB = {
  name: Command.FILL_DB,
  async run(arg) {

    console.log(`!!!! ++++++ ----`);
    const logger = getLogger({name: `api/fillDB`});

    connectToDB(sequelize, logger);

    const {Article, Category, Comment} = defineModels(sequelize);

    // console.log(Article);

    await sequelize.sync({force: true}); // создать заново все таблицы


    const commentList = await getTextListFromFile(FilePath.COMMENTS);
    const titles = await getTextListFromFile(FilePath.TITLES);
    const texts = await getTextListFromFile(FilePath.SENTENCES);
    const categoryList = await getTextListFromFile(FilePath.CATEGORIES);


    // console.log(categories);
    const categoryItems = createRandomCategories(categoryList).map((item) => ({name: item}));
    const categoryModels = await Category.bulkCreate(categoryItems);

    // console.log(categoryModels);

    const count = +arg || 1;


    if (count && count > PublicationCount.MAX) {
      console.error(red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.ERROR);
    }

    // const createArticles = async () => {

    //   return Array(count).fill(null).map(() => createPublication({titles, texts, categoryList, commentList}));
    // };

    const createArticlePromises = async (articles) => {
      const offerPromises = articles.map(async (article) => {
        const offerModel = await Article.create(article, {include: [Aliase.COMMENTS]});
        await offerModel.addCategories(Article.categories);
      });
      return await Promise.all(offerPromises);
    };


    const articles = Array(count).fill(null).map(() => createPublication({titles, texts, commentList, categoryModels}));


    // const publicationList = JSON.stringify(articles);

    try {
      await createArticlePromises(articles, Article);
      console.info(green(`Operation success. Articles are in DB`));
      // await writeFile(WRITE_FILE_NAME, publicationList);
      // console.info(green(`Operation success. File "${WRITE_FILE_NAME}" created.`));
    } catch (err) {
      console.error(red(`Can't write data to DB... ${err}`));
      process.exit(ExitCode.ERROR);
    }
  }
};
