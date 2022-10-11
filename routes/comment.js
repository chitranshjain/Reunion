const express = require("express");
const CommentController = require("../controllers/comment");
const { verifyToken } = require("../middlewares/authentication");
const router = express.Router();

router.post("/comment/:id", verifyToken, CommentController.addComment);

module.exports = router;
