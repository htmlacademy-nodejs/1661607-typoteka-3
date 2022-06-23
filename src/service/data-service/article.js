'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LENGTH} = require(`../../const`);


module.exports = class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = {...article, id: nanoid(ID_LENGTH), comments: []};
    this._articles.push(newArticle);
    return newArticle;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  update(id, article) {
    const oldArticle = this._articles.find((item) => item.id === id);
    return Object.assign(oldArticle, article);
  }

  drop(id) {
    const dropArticle = this._articles.find((article) => article.id === id);

    if (!dropArticle) {
      return null;
    }

    const articles = this._articles.filter((article) => article.id !== id);
    this._articles = articles;
    return dropArticle;
  }
};
