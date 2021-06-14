const Posts = require('../models/Post');

class PostsController {
    constructor() {
        this.Posts = Posts;
    }

    getMany = async(req, res, next) => {
        try {
            const posts = await this.Posts.find();

            res.status(200).json(posts);
        } catch (error) {
            console.log(error)
        }
    }

    getOne = async(req, res, next) => {
        try {
            const { id } = req.params;

            const post = await this.Posts.findById(id);

            if(post === null) {
                res.status(404).json({message: 'Página não encontrada'});
                return;
            }

            res.status(200).json(post);
        } catch (error) {
            console.log(error)
        }
    }
    
    createOne = async(req, res, next) => {
        try {            
            const newPost = new this.Posts(req.body);

            await newPost.save();

            res.status(201).json({ _id: newPost._id });
        } catch (error) {
            console.log(error)
        }
    }
    
    updateOne = async(req, res, next) => {
        try {
            const { params: { id }, body } = req;
            
            await this.Posts.findByIdAndUpdate(id, body);

            res.status(200).json({ message: `post ${id} updated` });
        } catch (error) {
            console.log(error)
        }
    }

    deleteOne = async(req, res, next) => {
        try {
            const { id } = req.params;

            await this.Posts.findByIdAndDelete(id);

            res.status(200).json({ message: `post ${id} deleted` });
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new PostsController();