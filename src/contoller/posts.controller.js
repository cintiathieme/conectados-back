const Posts = require('../models/Post');
const Users = require('../models/User');

class PostsController {
    constructor() {
        this.Posts = Posts;
        this.Users = Users;
    }

    getMany = async(req, res, next) => {
        try {
            const posts = await this.Posts.find();

            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
        }
    }

    getOne = async(req, res, next) => {
        try {
            const { id } = req.params;

            const post = await this.Posts.findById(id)

            if(post === null) {
                res.status(404).json({message: 'Página não encontrada'});
                return;
            }

            res.status(200).json(post);
        } catch (error) {
            console.log(error)
        }
    }
    
    getMyPosts = async(req, res, next) => {
        try {
            const posts = await this.Posts.find({ institution: req.user.id });            
            
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
        }
    }
    
    createOne = async(req, res, next) => {
        try { 
            const institution = await this.Users.find({institution: req.user.id });
            const institutionName = await institution.name;
            
            const newPost = await new this.Posts({ ...req.body, institution: req.user.id, institutionName: institutionName });
          
        
            await newPost.save();

            res.status(201).json(newPost);
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

    userInfos = async (req, res, next) => {
        try {
            const user = await this.Users.findOne( { _id: req.user.id });

            res.status(200).json(user);
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new PostsController();