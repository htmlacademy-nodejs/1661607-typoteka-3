'use strict';


const {Router} = require(`express`);
const {HttpCode, ServerRoute} = require(`../../const`);
const {asyncHandlerWrapper} = require(`../../utils`);
const addArticleToLocals = require(`../middleware/add-article-to-locals`);
const validateArticle = require(`../middleware/validate-article`);
const validateComment = require(`../middleware/validate-comment`);
const validateId = require(`../middleware/validateId`);


const ArticlesRoute = {
  MAIN: `/`,
  ARTICLE_BY_ID: `/:articleId`,
  COMMENTS_IN_ARTICLE: `/:articleId/comments`,
  COMMENTS: `/comments`,

  COMMENT_BY_ID: `/:articleId/comments/:commentId`
};


module.exports = (apiRouter, articleService, commentService) => {
  const articleRouter = new Router();

  apiRouter.use(ServerRoute.ARTICLES, articleRouter);

  articleRouter.get(ArticlesRoute.COMMENTS, asyncHandlerWrapper(async (req, res) => {
    const {limit} = req.query;

    const comments = await commentService.findAll(limit);

    return res.status(HttpCode.OK).json(comments);
  }));

  articleRouter.get(ArticlesRoute.MAIN, asyncHandlerWrapper(async (req, res) => {

    const {limit, offset, categoryId} = req.query;

    if (limit && offset) {
      const {articles, count} = await articleService.findPage({limit, offset, categoryId});
      return res.status(HttpCode.OK).json({articles, count});
    }

    const articles = await articleService.findAll();
    return res.status(HttpCode.OK).json({articles});
  }));

  articleRouter.get(ArticlesRoute.ARTICLE_BY_ID, validateId(`articleId`), asyncHandlerWrapper(async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found article with id = ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);
  }));

  articleRouter.post(ArticlesRoute.MAIN, validateArticle, asyncHandlerWrapper(async (req, res) => {
    const article = await articleService.create(req.body);

    return res.status(HttpCode.CREATED).json(article);
  }));

  articleRouter.put(ArticlesRoute.ARTICLE_BY_ID, validateArticle, asyncHandlerWrapper(async (req, res) => {
    const {articleId} = req.params;
    const oldArticle = req.body;
    const isOldArticle = await articleService.findOne(articleId);

    if (!isOldArticle) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found article with id = ${articleId}`);
    }

    const article = await articleService.update(articleId, oldArticle);
    return res.status(HttpCode.OK).json(article);
  }));

  articleRouter.delete(ArticlesRoute.ARTICLE_BY_ID, validateId(`articleId`), asyncHandlerWrapper(async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.drop(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found article with id = ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);
  }));

  articleRouter.get(ArticlesRoute.COMMENTS_IN_ARTICLE, addArticleToLocals(articleService), asyncHandlerWrapper(async (req, res) => {
    const {articleId} = res.locals;
    const comments = await commentService.findByArticleId(articleId);
    return res.status(HttpCode.OK).json(comments);
  }));

  articleRouter.post(ArticlesRoute.COMMENTS_IN_ARTICLE, [validateComment, addArticleToLocals(articleService)], asyncHandlerWrapper(async (req, res) => {

    const {articleId} = res.locals;

    const comments = await commentService.create(articleId, req.body);

    return res.status(HttpCode.CREATED).json(comments);
  }));

  articleRouter.delete(ArticlesRoute.COMMENT_BY_ID, [addArticleToLocals(articleService), validateId(`commentId`)], asyncHandlerWrapper(async (req, res) => {

    const {commentId} = req.params;
    const comment = await commentService.drop(commentId);

    if (!comment) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found comment with ${commentId}`);
    }

    return res.status(HttpCode.OK).json(comment);
  }));


};
