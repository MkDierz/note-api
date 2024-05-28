const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config');

function checkToken(req, res, next) {
  const { authorization } = req.headers;
  if (authorization) {
    const bearer = authorization.split(' ');
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, tokenSecret, (err, authData) => {
      if (err) {
        return res.status(403).send();
      }
      req.auth = authData;
      return next();
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = { checkToken };
