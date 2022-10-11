const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

const app = express();

// app.use(morgan.dev());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

app.use("/api/", userRoutes);
app.use("/api/", postRoutes);
app.use("/api/", commentRoutes);

mongoose
  .connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    return app.listen(process.env.PORT || 5000);
  })
  .then(() => {
    console.log(`Server is up and running on ${process.env.PORT || 5000}`);
  })
  .catch((error) => {
    console.log(
      `An error occurred while connecting to the server, ERROR : ${error.message}`
    );
  });

module.exports = app;
