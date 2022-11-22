const express = require('express');
const protect = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');

const router = express.Router();

// If the user wants to login, we call the protect middleware and if the user is loged in, we will call the postController.getAllPosts
// otherwise we will send a 401 status code and a message to the user that he needs to login first to get access to the posts page
router.route('/').get(protect, postController.getAllPosts).post(protect, postController.createPost);

router.route("/:id").get(protect, postController.getOnePost).patch(protect, postController.updatePost).delete(protect, postController.deletePost);

module.exports = router;
