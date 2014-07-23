var mongoose = require('mongoose');

// define the schema for our user model
var tiSchema = new mongoose.Schema({
  title: { type: String, trim: true, minlength: 1, maxlength: 30, required: true },
  description: { type: String, trim: true, minlength: 1, maxlength: 100},
  category: { type: String, trim: true, minlength: 1, maxlength: 20},
  date_begin: { type: Date, required: true },
  date_end: { type: Date, required: true },
  username: { type: String, trim: true, required: true, minlength: 5, maxlength: 40},
  hours: {type: Number, required: true},
  week: {type: Number, required: true},
  priority: {type: Number, min: 1, max: 5, required: true}

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Ti', tiSchema);