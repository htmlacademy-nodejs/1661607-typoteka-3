-- Получить список всех категорий (идентификатор, наименование категории);
SELECT * FROM categories;

-- Получить список категорий, для которых создана минимум одна публикация (идентификатор, наименование категории);
SELECT DISTINCT categories.id, categories.name FROM categories
  JOIN article_categories ON categories.id = article_categories.category_id
  JOIN articles ON article_categories.article_id = articles.id;

-- Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории);
SELECT DISTINCT categories.id, categories.name, COUNT(categories.id) FROM categories
   JOIN article_categories ON categories.id = article_categories.category_id
   JOIN articles ON article_categories.article_id = articles.id
   GROUP BY categories.id, categories.name;

-- Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации;
SELECT articles.id, title, announce, articles.createdDate, first_name, last_name, email, COUNT(comments.id), categories.name FROM articles
   LEFT JOIN article_categories ON article_categories.article_id = articles.id
   LEFT JOIN categories ON categories.id = article_categories.category_id
   LEFT JOIN users ON users.id = user_id
   LEFT JOIN comments ON comments.user_id = users.id
   GROUP BY articles.id, title, announce, articles.createdDate, first_name, last_name, email, categories.name;

-- Получить полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
SELECT articles.id, title, announce, articles.createdDate, first_name, last_name, email, COUNT(comments.id), categories.name FROM articles
   LEFT JOIN article_categories ON article_categories.article_id = articles.id
   LEFT JOIN categories ON categories.id = article_categories.category_id
   LEFT JOIN users ON users.id = user_id
   LEFT JOIN comments ON comments.user_id = users.id
   WHERE articles.id = 1
   GROUP BY articles.id, title, announce, articles.createdDate, first_name, last_name, email, categories.name;

-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария);
SELECT comments.id AS commentId, articles.id AS articleId, users.first_name, users.last_name, comments.createdDate, comments.text FROM articles
	JOIN comments ON comments.article_id = articles.id
	JOIN users ON users.id = comments.user_id
	ORDER BY articles.createdDate DESC
	LIMIT 5;

-- Получить список комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT comments.id AS commentId, articles.id AS articleId, users.first_name, users.last_name, comments.createdDate, comments.text FROM articles
	JOIN comments ON comments.article_id = articles.id
	JOIN users ON users.id = comments.user_id
	WHERE articles.id = 2
	ORDER BY articles.createdDate DESC;

-- Обновить заголовок определённой публикации на «Как я встретил Новый год»;
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE articles.id = 3;
