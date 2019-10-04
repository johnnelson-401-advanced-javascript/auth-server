const request = require('../request');
// const User = require('../../lib/models/user');
const db = require('../db');
const { signupUser } = require('../data-helpers');

describe('Tests the Dogs routes', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('dogs'));

  let user = null;
  beforeEach(() => {
    return signupUser().then(newUser => (user = newUser));
  });

  const testDoggo = {
    name: 'Togo',
    appearances: {
      breed: 'husky',
      mainColor: 'red'
    },
    hasPuppies: 4,
    isGoodDog: true,
    yearIntroduced: 1913
  };
  function postDoggo(dog) {
    return request
      .post('/api/dogs')
      .set('Authorization', user.token)
      .send(dog)
      .expect(200)
      .then(({ body }) => body);
  }
  it('posts a doggo', () => {
    return postDoggo(testDoggo).then(body => {
      // console.log(res);
      expect(body.owner).toBe(user._id);
      expect(body).toMatchInlineSnapshot(
        {
          ...testDoggo,
          _id: expect.any(String),
          owner: expect.any(String)
        },

        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "appearances": Object {
            "breed": "husky",
            "mainColor": "red",
          },
          "hasPuppies": 4,
          "isGoodDog": true,
          "media": Array [],
          "name": "Togo",
          "owner": Any<String>,
          "yearIntroduced": 1913,
        }
      `
      );
    });
  });
});
