'use strict';

const SERVER_URL = `http://localhost:8080`;


const SocketEvent = {
  ARTICLE_CHANGE: `article:change`,
  COMMENT_CHANGE: 'comment:change'
};


const createArticleElement = (article) => {
  const articleTemplate = document.querySelector('#top-article-template');
  const articleElement = articleTemplate.cloneNode(true).content;

  const link = articleElement.querySelector('.hot__list-link');
  const sup = document.createElement('sup');

  link.href = `/articles/${article.id}`;
  link.textContent = article.title;

  sup.classList.add('hot__link-sup');
  sup.textContent = article.count;

  link.append(sup);

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


const createCommentElement = (comment) => {
  const commentTemplate = document.querySelector('#top-comment-template');
  const commentElement = commentTemplate.cloneNode(true).content;

  const img = commentElement.querySelector('.last__list-image');
  const name = commentElement.querySelector('.last__list-name');
  const link = commentElement.querySelector('.last__list-link');

  img.src = `img/avatars/${comment.users.avatar}`;
  name.textContent = `${comment.users.firstName} ${comment.users.lastName}`;
  link.href = `/articles/${comment.articles.id}#comment-anchor`;
  link.textContent = comment.text

  return commentElement;
};

const updateCommentElements = (comments) => {
  const ul = document.querySelector('.last__list');
  ul.innerHTML = '';

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    ul.append(commentElement);
  })
}

const addSocketListener = () => {
  const socket = io(SERVER_URL);

  socket.addEventListener(SocketEvent.ARTICLE_CHANGE, (articles) => {
    updateArticleElements(articles)
  });

  socket.addEventListener(SocketEvent.COMMENT_CHANGE, (comments) => {
    updateCommentElements(comments)
  });
}

addSocketListener();
