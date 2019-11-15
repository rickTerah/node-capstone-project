const request = require('supertest');
const jwt = require('jsonwebtoken');
const db = require('../../models/db/index');

let server;
const token = jwt.sign({ userId: 1, isAdmin: true, email: 'patrick@gmail.com' }, 'jwtPrivateKey');

describe('api/v1/articles', () => {
  beforeEach(() => {
    server = require('../../server');
  });

  afterEach(async () => {
    await db.query('DELETE FROM articles');
    await db.query('DELETE FROM categories');
    server.close();
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
  });

  describe('GET', () => {
    it('should return 401 if user is not logged in', async () => {
      const res = await request(server).get('/api/v1/articles');
      expect(res.status).toBe(401);
    });

    it('should return 200 if user is authenticated', async () => {
      const res = await request(server)
        .get('/api/v1/articles')
        .set('token', token);
      expect(res.status).toBe(200);
    });
  });

  describe('GET /:id', () => {
    it('should return a 200 if a valid category id is passed', async () => {
      await db.query(
        `INSERT INTO categories (categoryId, categoryName) 
            VALUES (12, 'first category')`,
      );

      await db.query(
        `INSERT INTO articles (articleId, title, article, createdOn, categoryId, createdBy) 
          VALUES (1, 'title', 'article', '2019-11-6 18:0:42', 12, 'patrick')`,
      );
      const res = await request(server)
        .get(`/api/v1/articles/${1}`)
        .set('token', token);
      expect(res.status).toBe(200);
    });

    it('should return 404 if a valid id is not passed', async () => {
      const res = await request(server)
        .get(`/api/v1/articles/${13}`)
        .set('token', token);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {

    it('should return a 400 if article title is less than 2 character', async () => {
      await db.query(
        `INSERT INTO categories (categoryId, categoryName) 
        VALUES (12, 'first category')`,
      );

      const article = { title: 't', article: 'article', categoryId: 12 };
      const res = await request(server)
        .post('/api/v1/articles')
        .set('token', token)
        .send(article);
      expect(res.status).toBe(400);
    });

    it('should return a 201 if article body is valid', async () => {
      await db.query(
        `INSERT INTO categories (categoryId, categoryName) 
        VALUES (12, 'first category')`,
      );
      const article = { title: 'title', article: 'article', categoryId: 12 };
      const res = await request(server)
        .post('/api/v1/articles')
        .set('token', token)
        .send(article);
      expect(res.status).toBe(201);
    });
  });

  describe('PUT /:id', () => {
    it('should return a 400 if article title is invalid', async () => {
      await db.query(
        `INSERT INTO categories (categoryId, categoryName) 
            VALUES (12, 'first category')`,
      );

      await db.query(
        `INSERT INTO articles (articleId, title, article, createdOn, categoryId, createdBy) 
          VALUES (1, 'title', 'article', '2019-11-6 18:0:42', 12, 'patrick')`,
      );
      const article = { title: 't', article: 'article', categoryId: 2 };
      const res = await request(server)
        .patch(`/api/v1/articles/${12}`)
        .set('token', token)
        .send(article);
      expect(res.status).toBe(400);
    });

    it('should return a 403 if article title is valid but you not own it', async () => {
      await db.query(
        `INSERT INTO categories (categoryId, categoryName) 
            VALUES (12, 'first category')`,
      );

      await db.query(
        `INSERT INTO articles (articleId, title, article, createdOn, categoryId, createdBy) 
          VALUES (1, 'title', 'article', '2019-11-6 18:0:42', 12, 'patrick')`,
      );

      const article = { title: 'title', article: 'article' };
      const res = await request(server)
        .patch(`/api/v1/articles/${1}`)
        .set('token', token)
        .send(article);
      expect(res.status).toBe(403);
    });

    it('should return a 404 if article does not exist', async () => {
      const article = { title: 'title', article: 'article' };
      const res = await request(server)
        .patch(`/api/v1/articles/${2}`)
        .set('token', token)
        .send(article);
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /:id', () => {
    it('should return a 404 if article does not exist', async () => {
      const res = await request(server)
        .delete(`/v1/categories/${1}`)
        .set('token', token);
      expect(res.status).toBe(404);
    });

    it('should return a 403 if article exist', async () => {
      await db.query(
        `INSERT INTO categories (categoryId, categoryName) 
            VALUES (12, 'first category')`,
      );

      await db.query(
        `INSERT INTO articles (articleId, title, article, createdOn, categoryId, createdBy) 
          VALUES (1, 'title', 'article', '2019-11-6 18:0:42', 12, 'patrick')`,
      );
      const res = await request(server)
        .delete(`/api/v1/articles/${1}`)
        .set('token', token);
      expect(res.status).toBe(403);
    });
  });
});
