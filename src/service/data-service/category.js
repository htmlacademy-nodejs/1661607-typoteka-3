'use strict';

const Sequelize = require(`sequelize`);
const {Aliase} = require(`../../const`);


module.exports = class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
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
        attributes: []
      }]
    });

    return result.map((it) => it.get());
  }


  async drop(id) {
    const category = await this._Category.destroy({
      where: {id}
    });

    return !!category;
  }
};
