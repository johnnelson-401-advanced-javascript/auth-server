const { signupUser, signupAdmin } = require('../../lib/middleware/signup-admin');
const request = require('../request');
const { dropCollection } = require('../db');
const jwt = require('jsonwebtoken');




describe('Tests roles and ensure-role functionality', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('dogs'));

  let adminUser = null;
  beforeEach(() => {
    return signupAdmin().then(newUser => (adminUser = newUser));
  });
  beforeEach(() => { return signupUser(testUser); 
  });

  let testUser = null;


  it('Makes a user an Admin', () => {
    console.log(adminUser.roles);
    return request
      .put(`/api/auth/users/${testUser.id}/roles/admin`)
      .set('Authorization', adminUser.token)
      .expect(200);
  });



});
