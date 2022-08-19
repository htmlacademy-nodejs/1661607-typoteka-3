'use strict';

const Sequelize = require(`sequelize`);
const {Aliase, NOT_DROP_CATEGORY_MESSAGE} = require(`../../const`);


module.exports = class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
    this._Article = sequelize.models.Article;
    this._ArticleCategories = sequelize.models.ArticleCategories;
  }

  async create(category) {
    return await this._Category.create(category);
  }

  async findAll() {
    return await this._Category.findAll({row: true});
  }

  async findAllWithCount() {

    const result = await this._Category.findAll({
      attributes: [
        `id`,
        `name`,
        [
          Sequelize.fn(
              `COUNT`,
              `*`
          ),
          `count`
        ]
      ],
      group: [Sequelize.col(`Category.id`)],
      include: [{
        model: this._ArticleCategories,
        as: Aliase.ARTICLE_CATEGORIES,
        attributes: [],
        where: {
          ArticleId: {
            [Sequelize.Op.ne]: null
          }

        }
      }]
    });

    return result.map((it) => it.get());
  }


  async drop(id) {
    const articles = await this._ArticleCategories.findAll({
      where: {'CategoryId': id}
    });

    if (articles && articles.length) {
      return NOT_DROP_CATEGORY_MESSAGE;
    }

    const category = await this._Category.destroy({
      where: {id}
    });

    return !!category;
  }

  async update(id, data) {
    const category = await this._Category.update(data, {where: {id}});
    return !!category;
  }
};
