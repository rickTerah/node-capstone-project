const request = require('supertest');
const jwt = require('jsonwebtoken');
const db = require('../../models/db/index');

let server;
const token = jwt.sign({ userId: 1, isAdmin: true, email: 'patrick@gmail.com' }, 'jwtPrivateKey');

describe('api/v1/gifs', () => {
  beforeEach(() => {
    server = require('../../server');
  });

  afterEach(async () => {
    await db.query('DELETE FROM gifs');
    server.close();
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
  });

  describe('GET', () => {
    it('should return 401 if user is not logged in', async () => {
      const res = await request(server).get('/api/v1/gifs');
      expect(res.status).toBe(401);
    });

    it('should return 200 if user is authenticated', async () => {
      const res = await request(server)
        .get('/api/v1/gifs')
        .set('token', token);
      expect(res.status).toBe(200);
    });
  });

  describe('GET /:id', () => {
    it('should return a 200 if a valid gif id is passed', async () => {
      await db.query(
        `INSERT INTO gifs (gifId, title, imageUrl, createdOn, publicId, createdBy) 
        VALUES (1, 'title', 'image url', '2019-11-6 18:0:42', 'something', 'patrick')`,
      );
      const res = await request(server)
        .get(`/api/v1/gifs/${1}`)
        .set('token', token);
      expect(res.status).toBe(200);
    });

    it('should return 404 if a valid id is not passed', async () => {
      const res = await request(server)
        .get(`/api/v1/gifs/${13}`)
        .set('token', token);
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /:id', () => {
    it('should return a 404 if gif does not exist', async () => {
      const res = await request(server)
        .delete(`/api/v1/gifs/${1}`)
        .set('token', token);
      expect(res.status).toBe(404);
    });

    it('should return a 403 if gif exist', async () => {
      await db.query(
        `INSERT INTO gifs (gifId, title, imageUrl, createdOn, publicId, createdBy) 
                VALUES (1, 'title', 'image url', '2019-11-6 18:0:42', 'something', 'patrick')`,
      );

      const res = await request(server)
        .delete(`/api/v1/gifs/${1}`)
        .set('token', token);
      expect(res.status).toBe(403);
    });
  });
});
