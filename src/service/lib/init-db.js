"use strict";

const {Aliase} = require(`../../const`);
const defineModels = require(`../models`);


const initDB = async (sequelize, {categories, articles, users}) => {
  const {Category, Article, User} = defineModels(sequelize);
  await sequelize.sync({force: true});

  const categoryObjects = categories.map((item) => ({name: item})); // [{name: 'xxx'},...]
  const categoryModels = await Category.bulkCreate(categoryObjects);

  const userModels = await User.bulkCreate(users, {include: [Aliase.COMMENTS, Aliase.ARTICLES]});

  const categoryIdByName = categoryModels.reduce((acc, item) => ({[item.name]: item.id, ...acc}), {}); // [{it: 1}, {games: 2},...]

  const userIdByEmail = userModels.reduce((acc, item) => ({[item.email]: item.id, ...acc}), {});


  articles.forEach((item) => {
    item.userId = userIdByEmail[item.user];
    item.comments.forEach((com) => {
      com.userId = userIdByEmail[item.user];
    });
  });

  const articlePromises = articles.map(async (article) => {

    const articleModel = await Article.create(article, {include: [Aliase.COMMENTS]});
    const categoryIds = article.categories.map((name) => categoryIdByName[name]);
    await articleModel.addCategories(categoryIds);
  });
  await Promise.all(articlePromises);
};


module.exports = initDB;

