const Post = require("../models/post.model");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const secret = "lkdjfah807jdlfk89hjkdsjfb";

const creatingPost = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      console.log(info);
      if (err) throw err;
      const { title, summary, content } = req.body;
      const newPost = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author:info.id,
      
      });

      res.json(newPost);
    });

    // Create the post in the database

    // Send the response to the client with the created post data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = creatingPost;
