const Messages = require('../models/Message');

class MessageController {
    constructor() {
        this.Messages = Messages;
    }

    getMany = async(req, res, next) => {
        try {
            const messages = await this.Messages.find();

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

            const newMessage = new this.Messages({ 
                messageCollection: [
                    {
                        author: req.user.id,
                        message: req.body.message
                    }
                ], 
                user: req.user.id,  
                post: id });

            await newMessage.save();

            res.status(201).json(newMessage);
        } catch (error) {
            console.log(error)
        }
    }
    
//     addMessage = async(req, res, next) => {
//         try {
//             const { id } = req.params;

//             const newMessage = req.body;
//             console.log(req.body)
            
//             await this.Messages.findByIdAndUpdate(id, newMessage );

//             res.status(200).json({ message: `post ${id} updated` });
//         } catch (error) {
//             console.log(error)
//         }
//     }
    
}

module.exports = new MessageController();