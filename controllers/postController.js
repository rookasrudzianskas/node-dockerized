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
