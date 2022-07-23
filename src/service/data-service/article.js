'use strict';

const seq = require(`sequelize`);
const {Aliase} = require(`../../const`);


module.exports = class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
    this._sequelize = sequelize;
  }

  async create(data) {
    const article = await this._Article.create(data);
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

  // SELECT title, articles.id, string_agg(name, ', ') AS names FROM articles
  // JOIN article_categories on articles.id = "article_categories"."ArticleId"
  // JOIN categories ON categories.id = "article_categories"."CategoryId"
  // JOIN comments ON "comments"."articleId" = articles.id
  // WHERE articles.id IN
  // (
  //   SELECT articles.id FROM articles
  //   JOIN article_categories on articles.id = "article_categories"."ArticleId"
  //   JOIN categories ON categories.id = "article_categories"."CategoryId"
  //   where categories.id = 11
  // )

  // group by title, articles.id;


  async findPage({limit, offset, categoryId}) {


    if (categoryId) {
      console.log(`categoryId`, categoryId);
      const {count, rows} = await this._Article.findAndCountAll({
        // where: {"categories.id": categoryId},
        limit,
        offset,
        // include: [Aliase.CATEGORIES, Aliase.COMMENTS],
        include: [{model: this._Category, as: Aliase.CATEGORIES, where: {id: categoryId}}, Aliase.COMMENTS],
        // attributes: [
        //   [seq.literal(`STRING_AGG(categories.name,', ')`), `the_categories`]],
        order: [[`createdAt`, `DESC`]],
        distinct: true
      });

      console.log(count);
      return {count, articles: rows};
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
