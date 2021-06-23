const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema({
    institution: { type: Types.ObjectId, ref: 'User' },
    institutionName: { type: String },
    image: { type: String, default: '../images/voluntariado.jpg' },
    description: { type: String, required: true },
    job: { type: String, required: true },
    type: { type: String, required: true, enum:['recurrent', 'once'] }    
},
{
    timestamps: true,

});

const Post = model('Post', postSchema);

module.exports = Post;
