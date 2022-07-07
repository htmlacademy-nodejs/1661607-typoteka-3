"use strict";

const {Aliase} = require(`../../const`);
const defineModels = require(`../models`);


const initDB = async (sequelize, {categories, articles}) => {
  const {Category, Article} = defineModels(sequelize);
  await sequelize.sync({force: true});

  const categoryObjects = categories.map((item) => ({name: item})); // [{name: 'xxx'},...]
  const categoryModels = await Category.bulkCreate(categoryObjects);

  const categoryIdByName = categoryModels.reduce((acc, item) => ({[item.name]: item.id, ...acc}), {}); // [{it: 1}, {games: 2},...]


  const articlePromises = articles.map(async (article) => {
    const articleModel = await Article.create(article, {include: [Aliase.COMMENTS]});

    const categoryIds = article.categories.map((name) => categoryIdByName[name]);
    await articleModel.addCategories(categoryIds);
  });
  await Promise.all(articlePromises);
};


module.exports = initDB;
