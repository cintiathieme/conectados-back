const { date } = require('joi');
const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema({
    institution: { type: Types.ObjectId, ref: 'User' },
    institutionName: { type: String },
    imageUrl: { type: String, default: "https://res.cloudinary.com/doalhp0il/image/upload/v1624542421/conectados-images-repo/file_znaf1r.jpg" },
    description: { type: String, required: true },
    job: { type: String, required: true },
    type: { type: String, required: true, enum:['recurrent', 'once'] },
    date: {type: String}            
},
{
    timestamps: true,

});

const Post = model('Post', postSchema);

module.exports = Post;
