var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  email: String,
  displayName: String,
  password: String,
  type: String,
  level: Number
});

module.exports = mongoose.model('users', usersSchema);
