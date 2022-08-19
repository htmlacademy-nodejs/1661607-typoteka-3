'use strict';

const axios = require(`axios`).default;
const {ServerRoute} = require(`../const`);


const DEFAULT_TIMEOUT = 5000;

const port = process.env.FRONT_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;


class API {
  constructor(baseURL, timeout = DEFAULT_TIMEOUT) {
    this._http = axios.create({baseURL, timeout});
  }

  async _load(url, options) {
    const res = await this._http.request({url, ...options});
    return res.data;
  }


  getAllArticles({limit, offset, categoryId, top}) {
    if (top) {
      return this._load(ServerRoute.ARTICLES, {params: {top}});
    }
    if (limit !== undefined && offset !== undefined) {
      return this._load(ServerRoute.ARTICLES, {params: {limit, offset, categoryId}});
    }
    return this._load(ServerRoute.ARTICLES);
  }


  getOneArticles(id) {
    return this._load(`${ServerRoute.ARTICLES}/${id}`);
  }

  postArticle(data) {
    return this._load(ServerRoute.ARTICLES, {method: `POST`, data});
  }

  putArticle(id, data) {
    return this._load(`${ServerRoute.ARTICLES}/${id}`, {method: `PUT`, data});
  }

  deleteArticle(id, userId) {
    const data = {userId};
    return this._load(`${ServerRoute.ARTICLES}/${id}`, {method: `DELETE`, data});
  }


  search(title) {
    return this._load(ServerRoute.SEARCH, {params: {title}});
  }


  getAllComments(limit) {
    return this._load(`${ServerRoute.ARTICLES}/comments`, {params: {limit}});
  }

  getCommentsByArticleId(articleId) {
    return this._load(`${ServerRoute.ARTICLES}/${articleId}/comments`);
  }

  postComment(id, data) {
    return this._load(`${ServerRoute.ARTICLES}/${id}/comments`, {method: `POST`, data});
  }

  deleteComment(id, userId) {
    const data = {userId};

    return this._load(`${ServerRoute.COMMENTS}/${id}`, {method: `DELETE`, data});
  }


  getCategories(count) {
    return this._load(ServerRoute.CATEGORY, {params: {count}});
  }

  postCategory(data) {
    return this._load(ServerRoute.CATEGORY, {method: `POST`, data});
  }

  putCategory(id, data) {
    return this._load(`${ServerRoute.CATEGORY}/${id}`, {method: `PUT`, data});
  }

  deleteCategory(id, userId) {
    const data = {userId};
    return this._load(`${ServerRoute.CATEGORY}/${id}`, {method: `DELETE`, data});
  }

  postUser(data) {
    return this._load(ServerRoute.USER, {method: `POST`, data});
  }

  auth(data) {
    return this._load(ServerRoute.AUTH, {method: `POST`, data});
  }
}


module.exports = new API(defaultUrl, DEFAULT_TIMEOUT);
