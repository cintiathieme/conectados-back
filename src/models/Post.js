const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema({
    institution: { type: Types.ObjectId, ref: 'User' },
    image: { type: String, default: '../images/voluntariado.jpg' },
    description: { type: String, required: true },
    job: { type: String, required: true },
    date: { type: Date},
},
{
    timestamps: true,

});

const Post = model('Post', postSchema);

module.exports = Post;
