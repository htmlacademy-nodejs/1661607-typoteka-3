'use strict';

const {Server} = require(`socket.io`);

module.exports = (server) => new Server(server, {
  cors: {
    origins: [`localhost:8080`],
    methods: [`GET`]
  }
});
