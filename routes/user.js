const express = require("express");
const UserController = require("../controllers/user");
const { verifyToken } = require("../middlewares/authentication");
const router = express.Router();

router.get("/user/", verifyToken, UserController.getCurrentUser);

router.post("/signup", UserController.signUp);
router.post("/authenticate", UserController.login);
router.post("/follow/:id", verifyToken, UserController.followUser);
router.post("/unfollow/:id", verifyToken, UserController.unfollowUser);

module.exports = router;
