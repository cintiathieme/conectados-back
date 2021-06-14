const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema({
    institution: { type: Types.ObjectId, ref: 'Institution' },
    image: { type: String, default: '../images/voluntariado.jpg' },
    description: { type: String, require: true },
    job: { type: String, require: true },
    date: { type: Date},
},
{
    timestamps: true,

});

const Post = model('Post', postSchema);

module.exports = Post;
