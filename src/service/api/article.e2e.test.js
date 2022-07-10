// "use strict";

// const express = require(`express`);
// const request = require(`supertest`);

// const article = require(`./article`);
// const ArticleService = require(`../data-service/article`);
// const CommentService = require(`../data-service/comment`);
// const {MOCK_ARTICLES, CATEGORIES} = require(`../../tests/mocks`);
// const {ServerRoute, HttpCode} = require(`../../const`);
// const Sequelize = require(`sequelize`);
// const initDB = require(`../lib/init-db`);


// const mockArticle = MOCK_ARTICLES[0];
// const commentsOfFirstArticleRout = `${ServerRoute.ARTICLES}/${mockArticle.id}/comments`;
// const firstCommentOfFirstArticleRout = `${commentsOfFirstArticleRout}/${mockArticle.comments[0].id}`;
// const protoArticle = {
//   category: `new mock category`,
//   title: `new mock title`,
//   fullText: `new mock fullText`,
//   createdDate: `new mock createdDate`,
//   announce: `new mock announce`,
//   comments: []
// };


// const createAPI = async () => {
//   const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
//   await initDB(mockDB, {articles: MOCK_ARTICLES, categories: CATEGORIES});
//   const app = express();
//   app.use(express.json());
//   article(app, new ArticleService(mockDB), new CommentService(mockDB));
//   return app;
// };

// describe(`API returns a list of articles`, () => {


//   let response;

//   beforeAll(async () => {
//     const app = await createAPI();
//     response = await request(app)
//       .get(ServerRoute.ARTICLES);
//   });

//   test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

//   test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

//   test(`First article's id equals "${mockArticle.id}"`, () => expect(response.body[0].id).toBe(mockArticle.id));

// });

// describe(`API returns an article with given id`, () => {


//   let response;

//   beforeAll(async () => {
//     const app = await createAPI();
//     response = await request(app)
//       .get(`${ServerRoute.ARTICLES}/${mockArticle.id}`);
//   });

//   test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

//   test(`article's title is "${mockArticle.title}"`, () => expect(response.body.title).toBe(mockArticle.title));

// });

// describe(`API creates an article if data is valid`, () => {

//   const newArticle = {...protoArticle};
//   let response;
//   let app;

//   beforeAll(async () => {
//     app = await createAPI();

//     response = await request(app)
//       .post(ServerRoute.ARTICLES)
//       .send(newArticle);
//   });


//   test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


//   test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

//   test(`articles count is changed`, () => request(app)
//     .get(ServerRoute.ARTICLES)
//     .expect((res) => expect(res.body.length).toBe(6))// 5
//   );
// });

// describe(`API refuses to create an article if data is invalid`, () => {
//   let app;
//   beforeAll(async () => {
//     app = await createAPI();
//   });


//   test(`Without any required property response code is 400`, async () => {
//     const newArticle = {...protoArticle};
//     for (const key of Object.keys(newArticle)) {
//       const badArticle = {...protoArticle};
//       delete badArticle[key];
//       await request(app)
//         .post(ServerRoute.ARTICLES)
//         .send(badArticle)
//         .expect(HttpCode.BAD_REQUEST);
//     }
//   });

// });

// describe(`API changes existent article`, () => {

//   const newArticle = {...protoArticle};

//   let response;
//   let app;

//   beforeAll(async () => {
//     app = await createAPI();
//     response = await request(app)
//       .put(`${ServerRoute.ARTICLES}/${mockArticle.id}`)
//       .send(newArticle);
//   });

//   test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

//   test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

//   test(`article is really changed`, () => request(app)
//     .get(`${ServerRoute.ARTICLES}/${mockArticle.id}`)
//     .expect((res) => expect(res.body.title).toBe(protoArticle.title))
//   );

// });

// test(`API returns status code 404 when trying to change non-existent article`, () => {

//   let app;
//   beforeAll(async () => {
//     app = await createAPI();
//   });

//   const validArticle = {...protoArticle};

//   return request(app)
//     .put(`${ServerRoute.ARTICLES}/FAKE_ID`)
//     .send(validArticle)
//     .expect(HttpCode.NOT_FOUND);
// });

// test(`API returns status code 400 when trying to change an article with invalid data`, () => {

//   let app;
//   beforeAll(async () => {
//     app = await createAPI();
//   });

//   const invalidArticle = {...protoArticle};
//   delete invalidArticle.announce;

//   return request(app)
//     .put(`${ServerRoute.ARTICLES}/${mockArticle.id}`)
//     .send(invalidArticle)
//     .expect(HttpCode.BAD_REQUEST);
// });

// describe(`API correctly deletes an article`, () => {

//   let app;
//   beforeAll(async () => {
//     app = await createAPI();
//   });

//   let response;

//   beforeAll(async () => {
//     response = await request(app)
//       .delete(`${ServerRoute.ARTICLES}/${mockArticle.id}`);
//   });

//   test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

//   test(`Returns deleted article`, () => expect(response.body.id).toBe(mockArticle.id));

//   test(`article count is 4 now`, () => request(app)
//     .get(ServerRoute.ARTICLES)
//     .expect((res) => expect(res.body.length).toBe(4))
//   );

// });

// test(`API refuses to delete non-existent article`, () => {

//   let app;
//   beforeAll(async () => {
//     app = await createAPI();
//   });

//   return request(app)
//     .delete(`${ServerRoute.ARTICLES}/NOEXST`)
//     .expect(HttpCode.NOT_FOUND);

// });

// describe(`API returns a list of comments to given article`, () => {

//   let app;
//   beforeAll(async () => {
//     app = await createAPI();
//   });

//   let response;

//   beforeAll(async () => {
//     response = await request(app)
//       .get(commentsOfFirstArticleRout);
//   });

//   test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

//   test(`Returns list of 4 comments`, () => expect(response.body.length).toBe(4));

//   test(`First comment's id is "${mockArticle.comments[0].id}"`, () => expect(response.body[0].id).toBe(mockArticle.comments[0].id));

// });


// describe(`API creates a comment if data is valid`, () => {

//   const newComment = {
//     text: `test comment`
//   };

//   let app;
//   let response;

//   beforeAll(async () => {
//     app = await createAPI();
//     response = await request(app)
//       .post(commentsOfFirstArticleRout)
//       .send(newComment);
//   });


//   test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


//   test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

//   test(`Comments count is changed`, () => request(app)
//     .get(commentsOfFirstArticleRout)
//     .expect((res) => expect(res.body.length).toBe(5))
//   );

// });

// test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

//   let app;
//   beforeAll(async () => {
//     app = await createAPI();
//   });

//   return request(app)
//     .post(`${ServerRoute.ARTICLES}/FAKE_ID/comments`)
//     .send({
//       text: `Неважно`
//     })
//     .expect(HttpCode.NOT_FOUND);

// });

// test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

//   let app;
//   beforeAll(async () => {
//     app = await createAPI();
//   });

//   return request(app)
//     .post(commentsOfFirstArticleRout)
//     .send({})
//     .expect(HttpCode.BAD_REQUEST);

// });

// describe(`API correctly deletes a comment`, () => {


//   let response;
//   let app;

//   beforeAll(async () => {
//     app = await createAPI();
//     response = await request(app)
//       .delete(firstCommentOfFirstArticleRout);
//   });

//   test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

//   test(`Returns comment deleted`, () => expect(response.body.id).toBe(mockArticle.comments[0].id));

//   test(`Comments count is 3 now`, () => request(app)
//     .get(`${ServerRoute.ARTICLES}/${mockArticle.id}/comments/`)
//     .expect((res) => expect(res.body.length).toBe(3))
//   );

// });

// test(`API refuses to delete non-existent comment`, () => {

//   let app;
//   beforeAll(async () => {
//     app = await createAPI();
//   });

//   return request(app)
//     .delete(`${ServerRoute.ARTICLES}/${mockArticle.id}/comments/NOEXST`)
//     .expect(HttpCode.NOT_FOUND);

// });

// test(`API refuses to delete a comment to non-existent article`, () => {

//   let app;
//   beforeAll(async () => {
//     app = await createAPI();
//   });

//   return request(app)
//     .delete(`${ServerRoute.ARTICLES}/NOEXST/comments/${mockArticle.comments[0].id}`)
//     .expect(HttpCode.NOT_FOUND);
// });
