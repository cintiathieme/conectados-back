const { Schema, model } = require('mongoose');

const institutionSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, minlength: 4 },
    site: { type: String },
    address: { type: String },
    number: { type: Number },
    zipcode: { type: String },
    district: { type: String },
    city: { type: String },
    state: { type: String },
    category: { type: String, require: true, enum: ['Crianças', 'Idosos', 'Pessoas com deficiência', 'Animais', 'Mulheres', 'Pessoas em situação de rua', 'Meio ambiente', 'Combate à pobreza'] }, 
});

const Institution = model('Institution', institutionSchema);

module.exports = Institution;
