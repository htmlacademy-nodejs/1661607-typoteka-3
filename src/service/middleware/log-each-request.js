'use strict';

const {getLogger} = require(`../lib/logger`);


const logger = getLogger({name: `logEachRequest`});


// ??? добавить middleware как в примере:

// app.use((req, res, next) => {
//   logger.debug(`Request on route ${req.url}`);
//   res.on(`finish`, () => {
//     logger.info(`Response status code ${res.statusCode}`);
//   });
//   next();
// });

// почему-то не выходит - приходится добавлять на каждый запрос.

const logEachRequest = (req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => logger.info(`Response status code ${res.statusCode}`)); // и почему при гет запросах по articles выдает 304 ? (в категориях и поске 200)
  next();
};

module.exports = logEachRequest;
