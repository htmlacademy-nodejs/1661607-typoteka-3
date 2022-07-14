'use strict';

const {Aliase} = require(`../../const`);


module.exports = class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
  }

  async create(article) {
    return await this._Article.create(article);
  }

  async findAll() {
    const articles = await this._Article.findAll({
      include: [Aliase.CATEGORIES, Aliase.COMMENTS],
      order: [[`createdAt`, `DESC`]]
    });

    return articles.map((item) => item.get());
  }


  async findPage({limit, offset}) {
    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include: [Aliase.CATEGORIES, Aliase.COMMENTS],
      order: [[`createdAt`, `DESC`]],
      distinct: true
    });
    return {count, articles: rows};
  }

  async findOne(id) {
    return await this._Article.findByPk(id, {include: [Aliase.CATEGORIES]});
  }


  async update(id, article) {
    const [affectedRows] = await this._Article.update(article, {
      where: {id}
    });
    return !!affectedRows;
  }

  async drop(id) {
    const deletedRows = await this._Article.destroy({
      where: {id}
    });
    return !!deletedRows;
  }
};
