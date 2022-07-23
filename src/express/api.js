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


  getAllArticles({limit, offset, categoryId}) {
    if (limit !== undefined && offset !== undefined) {
      console.log(categoryId, categoryId);
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


  search(title) {
    return this._load(ServerRoute.SEARCH, {params: {title}});
  }


  getAllComments(articleId) {
    return this._load(`${ServerRoute.ARTICLES}/${articleId}/comments`);
  }

  getCommentsByArticleId(articleId) {
    return this._load(`${ServerRoute.ARTICLES}/${articleId}/comments`);
  }

  postComment(id, data) {
    return this._load(`${ServerRoute.ARTICLES}/${id}/comments`, {method: `POST`, data});
  }


  getCategories(count) {
    return this._load(ServerRoute.CATEGORY, {params: {count}});
  }

  postCategory(data) {
    return this._load(ServerRoute.CATEGORY, {method: `POST`, data});
  }
}


module.exports = new API(defaultUrl, DEFAULT_TIMEOUT);
