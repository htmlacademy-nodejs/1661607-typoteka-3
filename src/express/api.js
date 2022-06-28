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


  getAllArticles() {
    return this._load(ServerRoute.ARTICLES);
  }

  getOneArticles(id) {
    return this._load(`${ServerRoute.ARTICLES}/${id}`);
  }

  getAllComments(articleId) {
    return this._load(`${ServerRoute.ARTICLES}/${articleId}/comments`);
  }

  getCategories() {
    return this._load(ServerRoute.CATEGORY);
  }

  getCategoriesWithCount() {
    return this._load(ServerRoute.CATEGORY_WITH_COUNT);
  }

  search(title) {
    return this._load(ServerRoute.SEARCH, {params: {title}});
  }

  postArticle(data) {
    return this._load(ServerRoute.ARTICLES, {method: `POST`, data});
  }

  getAllComments(articleId) {
    return this._load(`${ServerRoute.ARTICLES}/${articleId}/comments`);
  }
}


module.exports = new API(defaultUrl, DEFAULT_TIMEOUT);
