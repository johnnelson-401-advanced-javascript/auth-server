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
  it('Updates a Doggo using the Put route, Only Owner can update', () => {
    function updateDoggo(dog, update) {
      return request
        .put(`/api/dogs/${dog._id}`)
        .set('Authorization', user.token)
        .send(update)
        .expect(200)
        .then(({ body }) => body);
    }

    let puppyUpdate = { hasPuppies: 5 };

    return postDoggo(testDoggo).then(body => {
      return updateDoggo(body, puppyUpdate).then(body => {
        expect(body).toMatchInlineSnapshot(
          {
            ...body,
            _id: expect.any(String),
            owner: expect.any(String),
            hasPuppies: 5
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "appearances": Object {
              "breed": "husky",
              "mainColor": "red",
            },
            "hasPuppies": 5,
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
});
