const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const randomId = require('../starters/identity');
require('../models/db/user')();
const db = require('../models/db/index');
const { validate } = require('../validates/user.validate');

class UserController {
  static async createUserAccount(req, res) {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }

    const {
      firstName, lastName, email, password, gender, jobRole, department, address, isAdmin,
    } = req.body;

    const identity = randomId(1000000);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await db.query(
      `INSERT INTO users (userId, firstName, lastName, email, password, gender, jobRole, department, address, isAdmin) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [identity, firstName, lastName, email, hashedPassword, gender, jobRole, department, address, isAdmin],
    );

    const token = jwt.sign({ userId: user.userId, isAdmin: user.isAdmin, email: user.email }, 'jwtPrivateKey');
    return res.status(201).json({
      status: 'sucess',
      data: {
        message: 'User account successfully created',
        token,
        userId: identity,
      },
    });
  }
}

module.exports = UserController;
