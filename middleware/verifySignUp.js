// check duplicate Username or Email
// To verify a Signup action, we need 2 functions:
// – check if username or email is duplicate or not
// – check if roles in the request is existed or not
const db = require('../models');

const { ROLES } = db;
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Email is already in use!',
      });
      return;
    }
    next();
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role does not exist = ${req.body.roles[i]}`,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
