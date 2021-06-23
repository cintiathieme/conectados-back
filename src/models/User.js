const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 4 },
    role: { type: String, required: true, enum:['volunteer', 'institution'] }
});

const User = model('User', userSchema);

module.exports = User;