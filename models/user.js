const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  avatarUrl: {type: String, default: '../images/avatar_circle.svg'},
  about: {type: String, default: ''},
  projects: [{ type: Schema.ObjectId, ref: 'Project' }],
  // connections: [{ type: Schema.ObjectId, ref: 'User' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;