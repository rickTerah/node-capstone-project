const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decodedPayload = jwt.verify(token, 'jwtPrivateKey');
    req.user = decodedPayload;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = authorization;
