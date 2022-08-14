'use strict';


const {Router} = require(`express`);
const {HttpCode, ServerRoute, SocketEvent, LIMIT_TOP_ARTICLES, LIMIT_COMMENTS} = require(`../../const`);
const {asyncHandlerWrapper} = require(`../../utils`);
const addArticleToLocals = require(`../middleware/add-article-to-locals`);
const checkAdmin = require(`../middleware/check-Admin`);
const validateArticle = require(`../middleware/validate-article`);
const validateComment = require(`../middleware/validate-comment`);
const validateId = require(`../middleware/validateId`);


const ArticlesRoute = {
  MAIN: `/`,
  ARTICLE_BY_ID: `/:articleId`,
  COMMENTS_IN_ARTICLE: `/:articleId/comments`,
  COMMENTS: `/comments`,
  COMMENT_BY_ID: `/comments/:commentId`,
};

const emit = (req, eventName, data) => {
  const {io} = req.app.locals;
  io.emit(eventName, data);
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

    const {limit, offset, categoryId, top} = req.query;

    if (top) {
      const articles = await articleService.findPage({top});
      return res.status(HttpCode.OK).json(articles);
    }

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


  articleRouter.post(ArticlesRoute.MAIN, [validateArticle], asyncHandlerWrapper(async (req, res) => {
    const article = await articleService.create(req.body);

    const articles = await articleService.findPage({top: LIMIT_TOP_ARTICLES});
    emit(req, SocketEvent.ARTICLE_CHANGE, articles);

    return res.status(HttpCode.CREATED).json(article);
  }));

  articleRouter.put(ArticlesRoute.ARTICLE_BY_ID, [validateArticle, checkAdmin], asyncHandlerWrapper(async (req, res) => {
    // console.log(`put ----------------------`, req.body);
    const {articleId} = req.params;
    // console.log(`articleId ----------------------`, articleId);

    const oldArticle = req.body;
    const isOldArticle = await articleService.findOne(articleId);
    // console.log(`isOldArticle ----------------------`, isOldArticle);


    if (!isOldArticle) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found article with id = ${articleId}`);
    }

    const article = await articleService.update(articleId, oldArticle);

    console.log(`article ----------------------`, article);


    const articles = await articleService.findPage({top: LIMIT_TOP_ARTICLES});
    console.log(`emit articles ----------------------`, articles);

    emit(req, SocketEvent.ARTICLE_CHANGE, articles);


    return res.status(HttpCode.OK).json(article);
  }));

  articleRouter.delete(ArticlesRoute.ARTICLE_BY_ID, [validateId(`articleId`), checkAdmin], asyncHandlerWrapper(async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.drop(articleId);


    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found article with id = ${articleId}`);
    }

    const articles = await articleService.findPage({top: LIMIT_TOP_ARTICLES});

    emit(req, SocketEvent.ARTICLE_CHANGE, articles);

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

    const AllComments = await commentService.findAll(LIMIT_COMMENTS);
    emit(req, SocketEvent.COMMENT_CHANGE, AllComments);

    return res.status(HttpCode.CREATED).json(comments);
  }));


  articleRouter.delete(ArticlesRoute.COMMENT_BY_ID, [validateId(`commentId`), checkAdmin], asyncHandlerWrapper(async (req, res) => {

    const {commentId} = req.params;
    const comment = await commentService.drop(commentId);

    if (!comment) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found comment with ${commentId}`);
    }

    const AllComments = await commentService.findAll(LIMIT_COMMENTS);
    emit(req, SocketEvent.COMMENT_CHANGE, AllComments);

    return res.status(HttpCode.OK).json(comment);
  }));
};
