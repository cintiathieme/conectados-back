const { Schema, model, Types } = require('mongoose');

const messageSchema = new Schema ({
    messageCollection: [
        {
            author: { type: Types.ObjectId, ref: 'User' },
            message: { type: String },
        }
    ],
    post: { type: Types.ObjectId, ref: 'Post'},
    volunteer: { type: Types.ObjectId, ref: 'User'},
    volunteerName: { type: String },
    institution: { type: Types.ObjectId, ref: 'User'},
    institutionName: { type: String },
},
{
    timestamps: true,
});

const Messages = model('Messages', messageSchema);

module.exports = Messages;