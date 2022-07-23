'use strict';

const {Aliase} = require(`../../const`);


module.exports = class CommentService {

  constructor(sequelize) {
    this._Comment = sequelize.models.Comment;
    this._Article = sequelize.models.Article;
  }

  async create(articleId, comment) {

    return await this._Comment.create({...comment, articleId});
  }

  async findOne(id) {
    return await this._Comment.findByPk(id);
  }

  async findAll(articleId) {
    const comments = await this._Comment.findAll({
      where: {articleId},
      order: [[`createdAt`, `ASC`]],
      include: [Aliase.USERS],
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
