'use strict';

const {Op, QueryTypes} = require(`sequelize`);
const {Aliase, ADMIN_ID} = require(`../../const`);


module.exports = class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
    this._sequelize = sequelize;
  }


  async create(data) {
    const article = await this._Article.create({...data, userId: ADMIN_ID});
    await article.addCategories(data.categories);
    return article.get();
  }

  async findAll() {
    const articles = await this._Article.findAll({
      include: [Aliase.CATEGORIES, Aliase.COMMENTS],
      order: [[`createdAt`, `DESC`]]
    });

    return articles.map((item) => item.get());
  }


  async findPage({limit, offset, categoryId, top}) {


    if (top) {
      const articles = await this._sequelize.query(
          `
          SELECT articles.title, articles.id, COUNT(comments.id) FROM articles
          LEFT JOIN comments ON "comments"."articleId" = articles.id
          GROUP BY articles.title, articles.id
          ORDER BY count DESC
          LIMIT :limit
          `,
          {
            replacements: {limit: top},
            type: QueryTypes.SELECT
          });
      return articles;
    }


    if (categoryId) {

      // Наверняка можно и одним запросом, но пока не знаю как

      const articleIds = await this._Article.findAll({
        include: [{model: this._Category, as: Aliase.CATEGORIES, where: {id: categoryId}}, Aliase.COMMENTS],
      });

      const ids = articleIds.map((item) => item.id);

      const articles = await this._Article.findAll({
        where: {
          id: {
            [Op.in]: ids
          }
        },
        limit,
        offset,
        order: [[`createdAt`, `DESC`]],
        include: [Aliase.CATEGORIES, Aliase.COMMENTS],
      });


      return {count: ids.length, articles};
    }
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
    const affectedRows = await this._Article.update(article, {where: {id}});

    const updatedArticle = await this._Article.findOne({where: {id}});

    await updatedArticle.setCategories(article.categories);

    return !!affectedRows;
  }

  async drop(id) {
    const deletedRows = await this._Article.destroy({
      where: {id}
    });
    return !!deletedRows;
  }
};
