'use strict';

module.exports = class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    const categories = this._articles.reduce((acc, article) => ([...acc, ...article.category]), []);
    return [...new Set(categories)];
  }
};
