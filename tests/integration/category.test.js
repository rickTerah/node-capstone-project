const request = require('supertest');
const jwt = require('jsonwebtoken');
const db = require('../../models/db/index');

let server;
const token = jwt.sign({ userId: 1, isAdmin: true, email: 'patrick@gmail.com' }, 'jwtPrivateKey');

describe('api/v1/categories', () => {
  beforeEach(() => {
    server = require('../../server');
  });

  afterEach(async () => {
    await db.query('DELETE FROM categories');
    server.close();
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
  });

  describe('GET', () => {
    it('should return 401 if user is not logged in', async () => {
      const res = await request(server).get('/api/v1/categories');
      expect(res.status).toBe(401);
    });

    it('should return 200 if user is authenticated', async () => {
      const res = await request(server)
        .get('/api/v1/categories')
        .set('token', token);
      expect(res.status).toBe(200);
    });
  });

  describe('GET /:id', () => {
    it('should return a 200 if a valid id is passed', async () => {
      await db.query(
        `INSERT INTO categories (categoryId, categoryName) 
            VALUES (12, 'first category')`,
      );
      const res = await request(server)
        .get(`/api/v1/categories/${12}`)
        .set('token', token);
      expect(res.status).toBe(200);
    });

    it('should return 404 if a valid id is not passed', async () => {
      const res = await request(server)
        .get(`/api/v1/categories/${13}`)
        .set('token', token);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('should return a 400 if category name is less than 2 character', async () => {
      const category = { categoryId: 3, categoryName: 'a' };
      const res = await request(server)
        .post('/api/v1/categories')
        .set('token', token)
        .send(category);
      expect(res.status).toBe(400);
    });

    it('should return a 400 if category name is greater than 50 character', async () => {
      const name = new Array(60).join('a');
      const category = { categoryId: 3, categoryName: name };
      const res = await request(server)
        .post('/api/v1/categories')
        .set('token', token)
        .send(category);
      expect(res.status).toBe(400);
    });

    it('should return a 201 if category body is valid', async () => {
      const category = { categoryName: 'category' };
      const res = await request(server)
        .post('/api/v1/categories')
        .set('token', token)
        .send(category);
      expect(res.status).toBe(201);
    });
  });

  describe('PUT /:id', () => {
    it('should return a 400 if category name is invalid', async () => {
      await db.query(
        `INSERT INTO categories (categoryId, categoryName) 
             VALUES (12, 'first category')`,
      );

      const category = { categoryName: 'a' };
      const res = await request(server)
        .patch(`/api/v1/categories/${12}`)
        .set('token', token)
        .send(category);
      expect(res.status).toBe(400);
    });

    it('should return a 201 if category name is valid', async () => {
      await db.query(
        `INSERT INTO categories (categoryId, categoryName) 
        VALUES (12, 'first category')`,
      );

      const category = { categoryName: 'first' };
      const res = await request(server)
        .patch(`/api/v1/categories/${12}`)
        .set('token', token)
        .send(category);
      expect(res.status).toBe(201);
    });

    it('should return a 404 if category does not exist', async () => {
      const category = { categoryName: 'first' };
      const res = await request(server)
        .patch(`/api/v1/categories/${1}`)
        .set('token', token)
        .send(category);
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /:id', () => {
    it('should return a 404 if category does not exist', async () => {
      const category = { categoryName: 'first' };
      const res = await request(server)
        .delete(`/api/v1/categories/${1}`)
        .set('token', token)
        .send(category);
      expect(res.status).toBe(404);
    });

    it('should return a 202 if category exist', async () => {
      await db.query(
        `INSERT INTO categories (categoryId, categoryName) 
            VALUES (12, 'first category')`,
      );
      const category = { categoryName: 'first' };
      const res = await request(server)
        .delete(`/api/v1/categories/${12}`)
        .set('token', token)
        .send(category);
      expect(res.status).toBe(202);
    });
  });
});
