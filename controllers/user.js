const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../middlewares/authentication");
const { default: mongoose } = require("mongoose");

const UserController = {};
const saltRounds = 10;

UserController.signUp = async (request, response) => {
  try {
    const { email, password } = request.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new Error("A user with the same email already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let newUser = new User({ email: email, password: hashedPassword });
    await newUser.save();
    newUser = newUser.toObject({ getters: true });
    let token = createToken(newUser.id);
    response
      .status(200)
      .json({ token: token, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    response
      .status(400)
      .json({ message: `An error occurred, ERROR : ${error.message}` });
  }
};

UserController.login = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) throw new Error("Invalid credentials");

    let existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      throw new Error("No user exists with the provided Email Address");
    }

    if (await bcrypt.compare(password, existingUser.password)) {
      existingUser = existingUser.toObject({ getters: true });
      let token = createToken(existingUser.id);
      response
        .status(200)
        .json({ token: token, message: "User logged in successfully" });
    } else throw new Error("Invalid password");
  } catch (error) {
    response
      .status(400)
      .json({ message: `An error occurred.`, error: error.message });
  }
};

UserController.getCurrentUser = async (request, response) => {
  try {
    response.status(200).json({
      message: "User profile fetched successfully",
      user: {
        email: request.user.email,
        followers: request.user.followers.length,
        following: request.user.following.length,
      },
    });
  } catch (error) {
    response
      .status(400)
      .json({ message: `An error occurred, ERROR : ${error.message}` });
  }
};

UserController.followUser = async (request, response) => {
  try {
    const followUserId = request.params.id;
    const currentUserId = request.user.id;

    let followUser = await User.findById(followUserId);
    let currentUser = await User.findById(currentUserId);

    if (!followUser) throw new Error("No user found with the provided ID");
    if (followUser.followers.find((followerId) => followerId == currentUserId))
      throw new Error("User already followed");

    const session = await mongoose.startSession();
    session.startTransaction({ session: session });
    followUser.followers.push(currentUser);
    await followUser.save({ session: session });
    currentUser.following.push(followUser);
    await currentUser.save({ session: session });
    await session.commitTransaction();

    response.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    response
      .status(400)
      .json({ message: `An error occurred, ERROR : ${error.message}` });
  }
};

UserController.unfollowUser = async (request, response) => {
  try {
    const followUserId = request.params.id;
    const currentUserId = request.user.id;

    let followUser = await User.findById(followUserId);
    let currentUser = await User.findById(currentUserId);

    if (!followUser) throw new Error("No user found with the provided ID");
    if (
      !currentUser.following.find((followingId) => followingId == followUserId)
    )
      throw new Error("User not followed");

    const session = await mongoose.startSession();
    session.startTransaction({ session: session });
    followUser.followers.pull(currentUser);
    await followUser.save({ session: session });
    currentUser.following.pull(followUser);
    await currentUser.save({ session: session });
    await session.commitTransaction();

    response.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    response
      .status(400)
      .json({ message: `An error occurred, ERROR : ${error.message}` });
  }
};

module.exports = UserController;
