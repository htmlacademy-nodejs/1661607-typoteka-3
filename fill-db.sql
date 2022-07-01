-- добавление юзеров
INSERT INTO users (first_name, last_name, email, password, avatar, role) VALUES
  ('Иди', 'Амин', 'scotish@king.ug', 'password1', 'avatar1', 'ADMIN'),
  ('Августо', 'Пиночет', 'chili@forever.ch', 'password3', 'avatar3', 'USER'),
  ('Пол', 'Пот', 'gensek@khmer.ka', 'password2', 'avatar2', 'USER');

-- добавление категорий
INSERT INTO categories (name) VALUES
  ('thoughtcrime'), ('doublethink'), ('bright future'), ('our happy childhood');

-- добавление статей
ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles (title, announce, fulltext, image, user_id) VALUES
  ('title 1', 'announce 1', 'full_textfull_text full_text full_text full_text1', 'image1', 1),
  ('title 2', 'announce 2', 'full_textfull_text full_textfull_textfull_textfull_text full_text full_text2', 'image2', 1),
  ('title 3', 'announce 3', 'full_textfull_text full_tex full_textfull_textfull_textfull_textfull_textfull_text t full_text full_text3', 'image3', 2);

-- добавление комментариев
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments (text, user_id, article_id) VALUES
  ('comment 1', 1, 1),
  ('comment 2', 1, 2),
  ('comment 3', 1, 3),
  ('comment 4', 2, 1),
  ('comment 5', 2, 2),
  ('comment 11', 2, 3),
  ('comment 22', 3, 1),
  ('comment 33', 3, 2),
  ('comment 43', 3, 3);

-- добавление связей статья - категория
ALTER TABLE article_categories DISABLE TRIGGER ALL;
INSERT INTO article_categories (article_id, category_id) VALUES
  (1, 1),
  (2, 1),
  (2, 2),
  (3, 1),
  (3, 2),
  (3, 3);

 ALTER TABLE article_categories ENABLE TRIGGER ALL;
