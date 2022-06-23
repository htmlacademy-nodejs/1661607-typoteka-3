'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LENGTH} = require(`../../const`);


module.exports = class CommentService {

  create(article, comment) {
    const newComment = {...comment, id: nanoid(ID_LENGTH)};
    article.comments.push(newComment);
    return newComment;
  }

  findAll(article) {
    return article.comments;
  }

  findOne(article, id) {
    return article.comments.find((comment) => comment.id === id);
  }

  drop(article, id) {
    const dropComment = article.comments.find((comment) => comment.id === id);
    console.log(dropComment);

    if (!dropComment) {
      return null;
    }

    const comments = article.comments.filter((comment) => comment.id !== id);
    article.comments = comments;
    return dropComment;
  }
};
