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


  getAllArticles({limit, offset}) {
    if (limit !== undefined && offset !== undefined) {
      return this._load(ServerRoute.ARTICLES, {params: {limit, offset}});
    }
    return this._load(ServerRoute.ARTICLES);
  }

  getOneArticles(id) {
    return this._load(`${ServerRoute.ARTICLES}/${id}`);
  }

  getAllComments(articleId) {
    return this._load(`${ServerRoute.ARTICLES}/${articleId}/comments`);
  }

  getCategories(count) {
    return this._load(ServerRoute.CATEGORY, {params: {count}});
  }

  search(title) {
    return this._load(ServerRoute.SEARCH, {params: {title}});
  }

  postArticle(data) {
    return this._load(ServerRoute.ARTICLES, {method: `POST`, data});
  }

  getCommentsByArticleId(articleId) {
    return this._load(`${ServerRoute.ARTICLES}/${articleId}/comments`);
  }
}


module.exports = new API(defaultUrl, DEFAULT_TIMEOUT);
