const express = require("express");
const PostController = require("../controllers/post");
const { verifyToken } = require("../middlewares/authentication");
const router = express.Router();

router.get("/posts/:id", verifyToken, PostController.getPost);
router.get("/all_posts", verifyToken, PostController.getAllPosts);

router.post("/posts/", verifyToken, PostController.createPost);
router.post("/like/:id", verifyToken, PostController.likePost);
router.post("/unlike/:id", verifyToken, PostController.unlikePost);

router.delete("/posts/:id", verifyToken, PostController.deletePost);

module.exports = router;
