'use strict';

// const { SocketEvent } = require("../../../const");

const SocketEvent = {
  ARTICLE_CREATE: `article:create`
};
const SERVER_URL = `http://localhost:3000`;

const createArticleElement = (article) => {
  const articleTemplate = document.querySelector('#top-article-template');
  const articleElement = articleTemplate.cloneNode(true).content;
  console.log('articleElement', articleElement)
  const link= articleElement.querySelector('.hot__list-link');

  link.href = `/articles/${article.id}`;
  link.textContent = article.title;
  const sup = document.createElement('sup');
  sup.classList.add('hot__link-sup');
  sup.textContent = article.count;
  link.append(sup);
    // articleElement.querySelector('.hot__link-sup').textContent = article.count;

  return articleElement;
};

const updateArticleElements = (articles) => {
  const ul = document.querySelector('.hot__list');
  ul.innerHTML = '';

  articles.forEach((article) => {
    const articleElement = createArticleElement(article);
    ul.append(articleElement);
  })

}


const addSocketListener = () => {
  // console.log('))))))__________________________articles______________________________')

  const socket = io(SERVER_URL);
  socket.addEventListener(SocketEvent.ARTICLE_CREATE, (articles) => {
    // console.log('__________________________articles______________________________', articles)
    updateArticleElements(articles)
  } );
}

addSocketListener();
