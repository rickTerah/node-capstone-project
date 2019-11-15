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

  describe('POST /', () => {
    it('should return a 400 if comment is invalid', async () => {
      const comment = { comment: '' };
      const res = await request(server)
        .post('/api/v1/gifs/2/comment')
        .set('token', token)
        .send(comment);
      expect(res.status).toBe(400);
    });

    it('should return a 404 if gif to comment does not exist', async () => {
      const comment = { comment: 'comment comment' };
      const res = await request(server)
        .post('/api/v1/gifs/2/comment')
        .set('token', token)
        .send(comment);
      expect(res.status).toBe(404);
    });

    it('should return a 201 if comment is valid', async () => {
      await db.query(
        `INSERT INTO gifs (gifId, title, imageUrl, createdOn, publicId, createdBy) 
        VALUES (1, 'title', 'image url', '2019-11-6 18:0:42', 'something', 'patrick')`,
      );

      const comment = { comment: 'comment comment' };
      const res = await request(server)
        .post('/api/v1/gifs/1/comment')
        .set('token', token)
        .send(comment);
      expect(res.status).toBe(201);
    });
  });
});
