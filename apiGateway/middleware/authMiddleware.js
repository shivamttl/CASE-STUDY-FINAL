const jwt = require('jsonwebtoken');
const requireAuth1 = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'reception', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send('token not verified');
      } else {
        next();
      }
    });
  } else {
    res.send('token not found');
  }
};
const requireAuth2 = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'manager', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send('token not verified');
      } else {
        next();
      }
    });
  } else {
    res.send('token not found');
  }
};
const requireAuth3 = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'owner', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send('token not verified');
      } else {
        next();
      }
    });
  } else {
    res.send('token not found');
  }
};
module.exports = { requireAuth1, requireAuth2, requireAuth3};