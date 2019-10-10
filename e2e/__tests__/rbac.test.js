const { signupUser, signupAdmin } = require('../../lib/middleware/signup-admin');
const request = require('../request');
const { dropCollection } = require('../db');
// const jwt = require('jsonwebtoken');




describe('Tests roles and ensure-role functionality', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('dogs'));

  let adminUser = null;
  beforeEach(() => {
    return signupAdmin().then(user => (adminUser = user));
  });
  let testUser = null;
  beforeEach(() => { 
    return signupUser().then(user => (testUser = user)
    ); 
  });



  it('Makes a user an Admin', () => {
    return request
      .put(`/api/auth/users/${testUser._id}/roles/admin`)
      .set('Authorization', adminUser.token)
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        
        expect(body.roles[0]).toBe('admin');
      });

  });



});
