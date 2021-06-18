const { Schema, model, Types } = require('mongoose');

const eachMessageSchema = new Schema ({
    author: { type: Types.ObjectId, ref: 'User' },
    message: { type: String },
})

const messageSchema = new Schema ({
    messageCollection: [
        {
            author: { type: Types.ObjectId, ref: 'User' },
            message: { type: String },
        }
    ],
    post: { type: Types.ObjectId, ref: 'Post'},
    user: { type: Types.ObjectId, ref: 'User'}
},
{
    timestamps: true,
});

const Messages = model('Messages', messageSchema);

module.exports = Messages;