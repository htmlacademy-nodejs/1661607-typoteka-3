'use strict';

const {Aliase} = require(`../../const`);


module.exports = class CommentService {

  constructor(sequelize) {
    this._Comment = sequelize.models.Comment;
    this._Article = sequelize.models.Article;
    this._User = sequelize.models.User;
  }

  _getUserWithoutPassword() {
    return {
      model: this._User,
      as: Aliase.USERS,
      attributes: {
        exclude: [`passwordHash`]
      }
    };
  }

  async create(articleId, comment) {

    return await this._Comment.create({...comment, articleId});
  }

  async findOne(id) {
    return await this._Comment.findByPk(id);
  }

  async findAll(limit) {

    const comments = await this._Comment.findAll({
      include: [
        Aliase.ARTICLES,
        this._getUserWithoutPassword()
      ],
      limit
    });

    return comments.map((item) => item.get());
  }

  async findByArticleId(articleId) {
    const comments = await this._Comment.findAll({
      where: {articleId},
      order: [[`createdAt`, `ASC`]],
      include: [this._getUserWithoutPassword()],
    });

    return comments.map((item) => item.get());
  }

  async drop(id) {
    const comment = await this._Comment.destroy({
      where: {id}
    });

    return !!comment;
  }
};
