CREATE TABLE categories (
  id  integer  PRIMARY KEY  GENERATED ALWAYS AS IDENTITY,
  name  varchar(63)  NOT NULL
);

CREATE TABLE users (
  id  integer  PRIMARY KEY  GENERATED ALWAYS AS IDENTITY,
  first_name  varchar(63)  NOT NULL,
  last_name  varchar(63)  NOT NULL,
  email  varchar(63)  NOT NULL,
  password  varchar(63)  NOT NULL,
  avatar  varchar(255)  NOT NULL,
  role  varchar(63)  NOT NULL
);

CREATE TABLE articles (
  id  integer  PRIMARY KEY  GENERATED ALWAYS AS IDENTITY,
  title  text  NOT NULL,
  announce  text  NOT NULL,
  fullText  text  NOT NULL,
  createdDate  timestamp  DEFAULT current_timestamp,
  image  varchar(255)  NOT NULL,
  user_id  integer  NOT NULL,
  FOREIGN KEY (user_id)  REFERENCES users(id)
);

CREATE INDEX ON articles(title);

CREATE TABLE comments (
  id  integer  PRIMARY KEY  GENERATED ALWAYS AS IDENTITY,
  text  text  NOT NULL,
  createdDate  timestamp  DEFAULT current_timestamp,
  article_id  integer  NOT NULL,
  user_id  integer  NOT NULL,
  FOREIGN KEY (article_id)  REFERENCES articles(id),
  FOREIGN KEY (user_id)  REFERENCES users(id)
);

CREATE TABLE article_categories (
  article_id  integer  NOT NULL,
  category_id  integer  NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id)  REFERENCES articles(id),
  FOREIGN KEY (category_id)  REFERENCES  categories(id)
);
