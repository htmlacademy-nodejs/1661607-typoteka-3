'use strict';


const {generate} = require(`./generate`);
const {version} = require(`./version`);
const {help} = require(`./help`);
const {fillDB} = require(`./filldb`);
const {server} = require(`./server`);


exports.Cli = {
  [generate.name]: generate,
  [version.name]: version,
  [help.name]: help,
  [server.name]: server,
  [fillDB.name]: fillDB

};
