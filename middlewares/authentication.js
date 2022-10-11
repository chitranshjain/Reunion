const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createToken = (id) => {
  return jwt.sign({ id }, "ReunionAssignment#007", {
    expiresIn: "30d",
  });
};

const verifyToken = async (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    let decodedToken = jwt.verify(token, "ReunionAssignment#007");
    let user = await User.findById(decodedToken.id).select("-password");
    if (!user) throw new Error("Unauthorized Access");

    request.user = user.toObject({ getters: true });
    next();
  } catch (error) {
    response
      .status(400)
      .json({ message: `An error occurred, ERROR : ${error.message}` });
  }
};

module.exports = { createToken, verifyToken };
