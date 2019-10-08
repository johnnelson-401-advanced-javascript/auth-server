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
  const balto = {
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
  function updateDoggo(dog, update) {
    return request
      .put(`/api/dogs/${dog._id}`)
      .set('Authorization', user.token)
      .send(update)
      .expect(200)
      .then(({ body }) => body);
  }
  it('Updates a Doggo using the Put route, Only Owner can update', () => {
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

  it('gets all doggos', () => {
    return Promise.all([
      postDoggo(testDoggo),
      postDoggo(balto)
    ])
      .then(() => {
        return request
          .get('/api/dogs')
          .set('Authorization', user.token);
      })
      .then(({ body }) => {
        expect(body.length).toBe(2);
      });
  });
  
  it('Should not allow different token to modify or delete a doggo', () => {
    return postDoggo(testDoggo).then(body => {
      db.dropCollection('users');

      let puppyUpdate = { isGoodDog: false };
      user.token = 42;
      return request
        .put(`/api/dogs/${body._id}`)
        .set('Authorization', user.token)
        .send(puppyUpdate)
        .expect(401);
    });
  });
  
  it('Deletes a Doggo', () => {
    return postDoggo(testDoggo).then(body => {
      return request
        .delete(`/api/dogs/${body._id}`)
        .set('Authorization', user.token)
        .expect(200);
    });
  });

});
