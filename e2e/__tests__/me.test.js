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
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              favorites: [expect.any(String)],
              hash: expect.any(String)
            },

            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "email": "me@me.com",
              "favorites": Array [
                Any<String>,
              ],
              "hash": Any<String>,
              "roles": Array [],
            }
          `
          );
        });
    });
  });

  it('should delete a favorite', () => {
    return postDoggo(testDoggo).then(results => {
      return favoriteDoggo(results, user).then(body => {
        console.log(body[0]);
        console.log(results[0]);
        return request
          .delete(`/api/me/favorites/${body[0]}`)
          .set('Authorization', user.token)
          .expect(200)
          .then(res => {
            (res);
          });
      });
    });
  });
});
