const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const secret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_REFRESH;

// User model
const User = require('../models/use/User');

let refreshTokens = [];

router.post('/signin', (req, res) => {
  // Read username and password from request body
  const { email, password } = req.body;

  // Filter user from the users array by username and password
  User.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) console.log(err);

        if (result) {
          const accessToken = jwt.sign(
            {
              username: user.username,
              role: user.role,
            },
            secret,
            { expiresIn: '20m' }
          );
          const refreshToken = jwt.sign(
            {
              username: user.username,
              role: user.role,
            },
            refreshSecret
          );

          refreshTokens.push(refreshToken);
          res.json({ accessToken, refreshToken });
        } else {
          res.send('Error_1: Password falsch');
        }
      });
    } else {
      res.send('Error_2: Email nicht registriert');
    }
  });
});

router.post('/token', (req, res) => {
  const { token } = req.body;

  if (!token) return res.sendStatus(401);

  if (!refreshTokens.includes(token)) return res.sendStatus(403);

  jwt.verify(token, refreshSecret, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      secret,
      { expiresIn: '20m' }
    );
    res.json({ accessToken });
  });
});

router.post('/logout', (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.send('Logout successful');
});

router.post('/signup', (req, res) => {
  const saltRounds = 10;
  const { email, firstName, lastName, password } = req.body;

  bcrypt.hash(password, saltRounds, (err1, hash) => {
    if (err1) res.send(err1.name);

    User.create({ email, firstName, lastName, password: hash })
      .then((user) => {
        res.send('Success');
      })
      .catch((err2) => {
        res.send(err2);
      });
  });
});

module.exports = router;
