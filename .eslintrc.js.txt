"use strict";

module.exports = {
  parserOptions: {
    ecmaVersion: 2018
  },

  env: {
    es6: true,
    node: true
  },

  plugins: ["jest"]
  ,
  env: {
    "jest/globals": true
  },
  extends: ['htmlacademy/node']

};
