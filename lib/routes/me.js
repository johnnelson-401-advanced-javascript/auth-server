const router = require('express').Router();
const User = require('../models/user');

router
  .get('/favorites', ({ user }, res, next) => {
    User.findById(user.id)
      .populate('user', 'dog')
      .lean()
      .then((favorites) => res.json(favorites))
      .catch(next);
  })
  
  .put('/favorites/:dogId', (req, res, next) => {
    const { user, params } = req;
    User.updateById(user.id, {
      $addToSet: {
        favorites: params.dogId
      }
    })
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  });
module.exports = router;
