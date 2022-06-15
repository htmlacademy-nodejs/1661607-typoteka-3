'use strict';

const http = require(`http`);
const {readFile} = require(`fs`).promises;
const {red, green} = require(`chalk`);
const {Command, FilePath} = require(`../../const`);


const Url = {
  MAIN: `/`,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
};

const DEFAULT_PORT = 3000;
const DEFAULT_NOT_FOUND_MESSAGE = `not found`;


const sendResponse = ({res, status, message}) => {
  const template = `
  <!Doctype html>
    <html lang="ru">
    <head>
      <title>With love from Node</title>
    </head>
    <body>${message}</body>
  </html>`;
  res.writeHead(status, {"Content-Type": `text/html; charset=UTF-8`});
  res.end(template);
};


const handleClientConnect = async (req, res) => {

  const sendNotFoundResponse = () => sendResponse({res, status: HttpCode.NOT_FOUND, message: DEFAULT_NOT_FOUND_MESSAGE});

  switch (req.url) {
    case Url.MAIN:
      try {
        const text = await readFile(FilePath.MOCKS, `utf-8`);
        const content = JSON.parse(text);
        const titles = content.map(({title}) => `<li>${title}</li>`).join(`\n`);
        sendResponse({res, status: HttpCode.OK, message: `<ul>${titles}</ul>`});
      } catch (err) {
        console.error(red(err));
        sendNotFoundResponse();
      }
      break;
    default:
      sendNotFoundResponse();
  }
};


exports.server = {
  name: Command.SERVER,
  run(consolePort) {

    const port = consolePort || DEFAULT_PORT;

    http.createServer(handleClientConnect)
      .listen(port)
      .on(`listening`, () => console.info(green(`Ожидаю соединений на ${port}`)))
      .on(`error`, ({message}) => console.error(red(`Ошибка при создании сервера: ${message}`)));
  }
};
