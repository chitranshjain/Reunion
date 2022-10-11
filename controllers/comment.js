const { default: mongoose } = require("mongoose");
const Comment = require("../models/comment");
const Post = require("../models/post");

const CommentController = {};

CommentController.addComment = async (request, response) => {
  try {
    const postId = request.params.id;
    const userId = request.user._id;
    const { text } = request.body;

    let post = await Post.findById(postId);
    if (!post) throw new Error("No post exists for the provided ID");

    let newComment = new Comment({
      text: text,
      userId: userId,
      postId: postId,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newComment.save({ session: session });
    post.comments.push(newComment);
    await post.save({ session: session });
    session.commitTransaction();

    response
      .status(200)
      .json({
        message: "Comment added successfully",
        commentId: newComment._id,
      });
  } catch (error) {
    response.status(400).json({
      message: `An error occurred while commenting, ERROR : ${error.message}`,
    });
  }
};

module.exports = CommentController;
