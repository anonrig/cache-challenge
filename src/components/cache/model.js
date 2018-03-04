const mongoose = require('mongoose');


const schema = new mongoose.Schema({
  key: String,
  payload: Object,
  lastUsed: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Cache', schema);
