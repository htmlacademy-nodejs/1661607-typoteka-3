'use strict';

const getCategoryWithCount = (categories) => {
  return categories.reduce((acc, category) => {
    if (acc[category]) {
      return {...acc, [category]: acc[category] + 1};
    } else {
      return {...acc, [category]: 1};
    }
  }, {});
};

const getCategoryArrayFromDict = (category) => Object.keys(category).map((item) => ({name: item, count: category[item]}));


module.exports = class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    const categories = this._articles.reduce((acc, article) => ([...acc, ...article.category]), []);
    return [...new Set(categories)];
  }

  findAllWithCount() {
    const categories = this._articles.reduce((acc, article) => ([...acc, ...article.category]), []);
    const categoryObj = getCategoryWithCount(categories);
    return getCategoryArrayFromDict(categoryObj);
  }
};
