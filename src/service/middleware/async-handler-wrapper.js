'use strict';

const asyncHandlerWrapper = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
// ??? получается, если res.* или next не вызваны, с этим должен бороться timeout ( axios.create({baseURL, timeout}) ) на "front-server"???


module.exports = asyncHandlerWrapper;
