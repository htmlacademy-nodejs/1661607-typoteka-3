'use strict';

const {Router} = require(`express`);
const {readFile} = require(`fs`).promises;
const {FilePath, HttpCode} = require(`../../../const.js`);
const {red} = require(`chalk`);


const DEFAULT_NOT_FOUND_MESSAGE = `not found`;


const postsRouter = new Router();

postsRouter.get(`/`, async (req, res) => {
  try {
    const content = await readFile(FilePath.MOCKS, `utf-8`);
    const mocks = JSON.parse(content);
    res.json(mocks);
  } catch (err) {
    res.json([]);
    console.error(red(err));
  }
});

postsRouter.use((req, res) => res.status(HttpCode.NOT_FOUND).json(DEFAULT_NOT_FOUND_MESSAGE));


module.exports = postsRouter;
