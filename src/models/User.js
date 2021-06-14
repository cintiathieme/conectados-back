const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, minlength: 4 },
});

const User = model('User', userSchema);

module.exports = User;