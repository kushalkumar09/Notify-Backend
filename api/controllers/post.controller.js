const Post = require("../models/post.model");
const fs = require("fs");

const creatingPost = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body;

    // Create the post in the database
    const newPost = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
    });

    // Send the response to the client with the created post data
    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = creatingPost;
