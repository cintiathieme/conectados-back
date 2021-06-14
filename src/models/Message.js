const { Schema, model, Types } = require('mongoose');

const messageSchema = new Schema ({
    message: { type: 'String'},
    institution: { type: Types.ObjectId, ref: 'Institution'},
    user: { type: Types.ObjectId, ref: 'User'}
},
{
    timestamps: true,
});

const Message = model('Message', messageSchema);

module.exports = Message;