var mongoose = require('mongoose');

// define the schema for our user model
var tiSchema = new mongoose.Schema({
  username: { type: String, trim: true, required: true, minlength: 5, maxlength: 40},
  password: { type: String, trim: true, required: true, minlength: 5, maxlength: 40}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', tiSchema);