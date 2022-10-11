const { default: mongoose } = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");

const PostController = {};

PostController.createPost = async (request, response) => {
  try {
    const { title, description } = request.body;
    let creator = await User.findById(request.user.id);
    const session = await mongoose.startSession();
    session.startTransaction({ session: session });
    const newPost = new Post({
      title,
      description,
      createdBy: request.user.id,
    });
    await newPost.save({ session });
    creator.posts.push(newPost);
    await creator.save({ session: session });
    await session.commitTransaction();

    response.status(200).json({
      message: "Post created successfully",
      post: {
        postId: newPost.id,
        title: newPost.title,
        description: newPost.description,
        createdAt: newPost.createdAt,
      },
    });
  } catch (error) {
    response
      .status(400)
      .json({ message: `An error occurred, ERROR : ${error.message}` });
  }
};

PostController.deletePost = async (request, response) => {
  try {
    const postId = request.params.id;
    const post = await Post.findOne({
      _id: postId,
      createdBy: request.user._id,
    });

    let creator = await User.findById(request.user._id);

    if (!post)
      throw new Error("No post with the provided ID found for the user");

    const session = await mongoose.startSession();
    session.startTransaction({ session: session });
    await Post.findByIdAndDelete(postId, { session: session });
    creator.posts.pull(postId);
    await creator.save({ session: session });
    session.commitTransaction();

    response.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    response
      .status(400)
      .json({ message: `An error occurred, ERROR : ${error.message}` });
  }
};

PostController.likePost = async (request, response) => {
  try {
    let postId = request.params.id;
    let post = await Post.findById(postId);

    if (!post) throw new Error("No post found for the provided ID");
    if (
      post.likedBy.find((userId) => String(userId) == String(request.user._id))
    )
      throw new Error("Post already liked");

    post.likedBy.push(request.user._id);
    await post.save();

    response.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    response.status(400).json({
      message: `An error occurred while liking the post, ERROR : ${error.message}`,
    });
  }
};

PostController.unlikePost = async (request, response) => {
  try {
    let postId = request.params.id;
    let post = await Post.findById(postId);

    if (!post) throw new Error("No post found for the provided ID");
    if (
      !post.likedBy.find((userId) => String(userId) == String(request.user._id))
    )
      throw new Error("Post not liked");

    post.likedBy.pull(request.user._id);
    await post.save();

    response.status(200).json({ message: "Post unliked successfully" });
  } catch (error) {
    response.status(400).json({
      message: `An error occurred while unliking the post, ERROR : ${error.message}`,
    });
  }
};

PostController.getPost = async (request, response) => {
  try {
    const postId = request.params.id;
    let post = await Post.findById(postId);

    if (!post) throw new Error("No post found for the provided ID");

    response.status(200).json({
      message: "Post fetched successfully",
      post: {
        title: post.title,
        description: post.description,
        likes: post.likedBy.length,
        comments: post.comments.length,
      },
    });
  } catch (error) {
    response
      .status(200)
      .json({ message: `An error occurred, ERROR : ${error.message}` });
  }
};

PostController.getAllPosts = async (request, response) => {
  try {
    let posts = await Post.find({ createdBy: request.user._id }).populate(
      "comments"
    );

    posts = posts.map((post) => {
      return {
        id: post._id,
        title: post.title,
        desc: post.description,
        created_at: post.createdAt,
        comments: post.comments,
        likes: post.likedBy.length,
      };
    });

    response
      .status(200)
      .json({ message: "Posts fetched successfully", posts: posts });
  } catch (error) {
    response
      .status(400)
      .json({ message: `An error occurred, ERROR : ${error.message}` });
  }
};

module.exports = PostController;
