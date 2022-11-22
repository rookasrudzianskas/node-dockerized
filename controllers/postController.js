const Post = require('../models/postModel');

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
