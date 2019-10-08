/* eslint-disable new-cap */
const router = require('express').Router();
const Dog = require('../models/dog');

router
  .post('/', (req, res, next) => {
    req.body.owner = req.user.id;
    Dog.create(req.body)
      .then(dog => res.json(dog))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Dog.find()
      .then(dogs => res.json(dogs))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Dog.findById(req.params.id)
      .then(dog => res.json(dog))
      .catch(next);
  })

//ONLY OWNER SHOULD BE ABLE TO ACCESS THESE ROUTES
  .put('/:id', (req, res, next) =>{

    Dog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .then(dog => res.json(dog))
      .catch(next);
  })
  .delete('/:id', (req, res, next) =>{
    Dog.findByIdAndDelete(req.params.id)
      .then(dog => res.json(dog))
      .catch(next);
  });
	
module.exports = router;