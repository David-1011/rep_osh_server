// handle signup & signin actions
// There are 2 main functions for Authentication:
// - signup: create new User in database (role is user if not specifying role)
// - signin:

// find username of the request in database, if it exists
// compare password with password in database using bcrypt, if it is correct
// generate a token using jsonwebtoken
// return user information & access Token
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const config = require('../config/auth.config');

const User = db.user;

let refreshTokens = [];

exports.signup = (req, res) => {
  // Save User to Database
  const saltRounds = 8;
  bcrypt.hash(req.body.password, saltRounds, (err1, hash) => {
    if (err1) res.send(err1.name);

    User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash,
    })
      .then((user) => {
        user.setUseRoles([1]).then(() => {
          res.send({ message: 'User was registered successfully!' });
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }
      bcrypt.compare(
        req.body.password,
        user.password,
        (err, passwordIsValid) => {
          if (err) console.log(err);

          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: 'Invalid Password!',
            });
          }

          const accessToken = jwt.sign(
            {
              id: user.id,
              email: user.email,
              role: user.role,
            },
            config.jwtSecret,
            { expiresIn: 1200 }
          );
          const refreshToken = jwt.sign(
            {
              email: user.email,
              role: user.role,
            },
            config.jwtRefresh
          );
          refreshTokens.push(refreshToken);

          const authorities = [];
          user.getUseRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push(`ROLE_ + ${roles[i].name.toUpperCase()}`);
            }
            res.status(200).send({
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              roles: authorities,
              accessToken,
            });
          });
        }
      );
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.token = (req, res) => {
  const { token } = req.body;

  if (!token) return res.sendStatus(401);

  if (!refreshTokens.includes(token)) return res.sendStatus(403);

  jwt.verify(token, config.jwtRefresh, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { email: user.email, role: user.role },
      config.jwtSecretsecret,
      { expiresIn: 1200 }
    );
    res.status(200).send({ accessToken });
  });
};

exports.signout = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.send('Logout successful');
};
