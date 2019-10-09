const request = require('../../e2e/request');
const User = require('../models/user');

const testUser = {
  email: 'me@me.com',
  password: 'abc'
};

const adminUser = {
  email: 'admin@me.com',
  password: 'abc'
};

function signupUser(user = testUser) {
  return request
    .post('/api/auth/signup')
    .send(user)
    .expect(200)
    .then(({ body }) => body);
}

function signupAdmin(user = adminUser) {
  return signupUser(user)
    .then(signedUp => {
      return User.updateById(signedUp._id, {
        $addToSet: { roles: 'admin' }
      });
    })
    .then(() => {

      return request
        .post('/api/auth/signin')
        .send(user)
        .expect(200)
        .then(({ body }) => {
          return body;
        });
    });
}



module.exports = {
  signupUser,
  signupAdmin
};