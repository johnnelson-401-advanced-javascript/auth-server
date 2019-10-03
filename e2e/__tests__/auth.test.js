const request = require('../request');
const { dropCollection } = require('../db');

describe('Auth API', () => {

  beforeEach(() => dropCollection('users'));
  const data = {
    email: 'user@user.com',
    password: 'abc123',
    roles: []
  };

  it('signs up a user', () => {
    return request
      .post('/api/auth/signup')
      .send(data)
      .expect(200)
      .then(({ body }) => body)
      .then(user => {
        expect(user.token).toBeDefined();
      });
  });
});