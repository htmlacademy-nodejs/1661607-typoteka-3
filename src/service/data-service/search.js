'use strict';

const checkText = (needText, text) => text.toUpperCase().includes(needText.toUpperCase());

module.exports = class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(searchedText) {
    return this._articles.filter((article) => checkText(searchedText, article.title));
  }

};
