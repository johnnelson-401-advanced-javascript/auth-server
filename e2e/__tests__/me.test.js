const request = require('../request');
// const User = require('../../lib/models/user');
const db = require('../db');
const { signupUser } = require('../data-helpers');

describe('Tests routes for Me and favorites', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('dogs'));

  let user = null;
  beforeEach(() => {
    return signupUser().then(newUser => (user = newUser));
  });

  const testDoggo = {
    name: 'Balto',
    appearances: {
      breed: 'husky',
      mainColor: 'black'
    },
    hasPuppies: 0,
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

  function favoriteDoggo(dog, user) {
    return request
      .put(`/api/me/favorites/${dog._id}`)
      .set('Authorization', user.token)
      .expect(200)
      .then(({ body }) => body);
  }

  it('should post to favorites', () => {
    return postDoggo(testDoggo).then(results => {
      expect(results.owner).toBe(user._id);
      return favoriteDoggo(results, user).then(body => {
        expect(body[0]).toBe(results._id);
      });
    });
  });
  it('Gets all favorites', () => {
    return postDoggo(testDoggo).then(results => {
      expect(results.owner).toBe(user._id);
      return favoriteDoggo(results, user)
        .then(() => {
          return request
            .get('/api/me/favorites')
            .set('Authorization', user.token)
            .expect(200)
            .then(body => body);
        })
        .then(({ body }) => {
          console.log(body);
          expect(body).toMatchInlineSnapshot(
            {
              ...body,
              favorites: [expect.any(String)]
            },

            `
            Object {
              "__v": 0,
              "_id": "5d9cd1f2925bbeefb7848ae0",
              "email": "me@me.com",
              "favorites": Array [
                Any<String>,
              ],
              "hash": "$2a$08$L3zyCfw6bLimEY/419NPyedOOrGrE1Hb2o4noAWQbdi38FMLeL7Vq",
              "roles": Array [],
            }
          `
          );
        });
    });
  });
});
