const Messages = require('../models/Message');
const Posts = require('../models/Post');
const Users = require('../models/User');

class MessageController {
    constructor() {
        this.Messages = Messages;
        this.Posts = Posts;
        this.Users = Users; 
    }

    getMany = async(req, res, next) => {
        try {
            const messages = await this.Messages.find({$or: [{institution: req.user.id}, {volunteer: req.user.id}]}).sort({updateAt: -1});           

            res.status(200).json(messages);
        } catch (error) {
            console.log(error)
        }
    }

    getOne = async(req, res, next) => {
        try {
            const { id } = req.params;

            const message = await this.Messages.findById(id);

            if(message === null) {
                res.status(404).json({message: 'Página não encontrada'});
                return;
            }

            res.status(200).json(message);
        } catch (error) {
            console.log(error)
        }
    }
    
    createOne = async(req, res, next) => {
        try { 
            const { id } = req.params;

            const post = await this.Posts.findById(id);
            const institutionId = await post.institution;

            const institution = await this.Users.findById(institutionId);
            const institutionName = await institution.name;

            const volunteer = await this.Users.findById(req.user.id);
            const volunteerName = await volunteer.name;

            const date = new Date();
            const messageDate = date.toLocaleDateString("pt-BR")  

            const newMessage = await new this.Messages({ 
                messageCollection: [
                    {
                        author: req.user.id,
                        message: req.body.message,
                        date: messageDate
                    }
                ], 
                volunteer: req.user.id,
                volunteerName: volunteerName,   
                post: id,
                institution: institutionId,
                institutionName: institutionName,
            }
            );
            console.log(newMessage)

            await newMessage.save();

            res.status(201).json(newMessage);
        } catch (error) {
            console.log(error)
        }
    }
    
    addMessage = async(req, res, next) => {
        try {
            const { id } = req.params;
            
            await this.Messages.findByIdAndUpdate(id, {$push:  {messageCollection: [
                {
                    author: req.user.id,
                    message: req.body.message
                }
            ]}});

            res.status(200).json({ message: `post ${id} updated` });
        } catch (error) {
            console.log(error)
        }
    }
    
}

module.exports = new MessageController();