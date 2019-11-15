const request = require('supertest');
const jwt = require('jsonwebtoken');
const db = require('../../models/db/index');

let server;
const userRegister = {
  firstName: 'patrick',
  lastName: 'mwangi',
  email: 'patrickmwangi@gmail.com',
  password: '1234',
  gender: 'male',
  jobRole: 'Engineer',
  department: 'Back',
  address: '123pat456',
  isAdmin: true,
};

const userLogin = {
  email: 'patrickmwangi@gmail.com',
  password: '1234',
};

const token = jwt.sign({ userId: 1, isAdmin: true, email: 'patrick@gmail.com' }, 'jwtPrivateKey');
const notAdminToken = jwt.sign({ userId: 1, isAdmin: false, email: 'patrick@gmail.com' }, 'jwtPrivateKey');

describe('api/v1/auth', () => {
  beforeEach(() => {
    server = require('../../server');
  });

  afterEach(async () => {
    await db.query('DELETE FROM users');
    server.close();
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
  });

  describe('POST create-user/', () => {
    it('should return 401 if user is not logged in', async () => {
      const res = await request(server)
        .post('/api/v1/auth/create-user')
        .send(userRegister);
      expect(res.status).toBe(401);
    });

    it('should return 403 if user is not an admin', async () => {
      const res = await request(server)
        .post('/api/v1/auth/create-user')
        .set('token', notAdminToken)
        .send(userRegister);
      expect(res.status).toBe(403);
    });


    it('should return a 400 if user details are invalid', async () => {
      const user = { };
      const res = await request(server)
        .post('/api/v1/auth/create-user')
        .set('token', token)
        .send(user);
      expect(res.status).toBe(400);
    });

    it('should return a 400 if user already exist', async () => {
      const {
        firstName, lastName, email, password, gender, jobRole, department, address, isAdmin,
      } = userRegister;
      await db.query(
        `INSERT INTO users (userId, firstName, lastName, email, password, gender, jobRole, department, address, isAdmin) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [1, firstName, lastName, email, password, gender, jobRole, department, address, isAdmin],
      );
      const res = await request(server)
        .post('/api/v1/auth/create-user')
        .set('token', token)
        .send(userRegister);
      expect(res.status).toBe(400);
    });

    it('should return a 201 if registration is valid', async () => {
      const res = await request(server)
        .post('/api/v1/auth/create-user')
        .set('token', token)
        .send(userRegister);
      expect(res.status).toBe(201);
    });
  });

  describe('POST signin/', () => {
    it('should return a 400 if user login details are invalid', async () => {
      const user = { };
      const res = await request(server)
        .post('/api/v1/auth/signin')
        .send(user);
      expect(res.status).toBe(400);
    });

    it('should return a 400 if user does not exist', async () => {
      const res = await request(server)
        .post('/api/v1/auth/signin')
        .send(userLogin);
      expect(res.status).toBe(400);
    });
  });
});
