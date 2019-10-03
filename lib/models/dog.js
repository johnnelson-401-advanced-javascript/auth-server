const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  appearances: {
    breed: String,
    mainColor: {
      type: String,
      required: true
    }
  },
  hasPuppies: {
    type: Number,
    min: 0,
    max: 101
  },
  isGoodDog: {
    type: Boolean,
    default: true
  },
  media: [{
    type: String,
    enum: ['movies', 'comics', 'tv', 'internet', 'irl']
  }],
  yearIntroduced: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Dog', schema);