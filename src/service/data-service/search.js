'use strict';

const {Op} = require(`sequelize`);


module.exports = class SearchService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
  }

  async findAll(searchedText) {

    const articles = await this._Article.findAll({
      where: {
        title: {
          [Op.iLike]: `%${searchedText}%` // ??? почему-то не работает регистронезависимость
        }
      },
      order: [[`createdAt`, `DESC`]]
    });

    return articles.map((item) => item.get());
  }
};
