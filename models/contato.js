var mongoose = require('mongoose');

// define the schema for our user model
var contatoSchema = new mongoose.Schema({
  operadora: { type: String, trim: true, required: true},
  DDD: { type: String, trim: true, required: true},
  numero: {type: String, trim: true, required: true}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Contato', contatoSchema);