const Post = require("../models/post.model");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");

const secret = "lkdjfah807jdlfk89hjkdsjfb";

const creatingPost = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = `${path}.${extension}`;

    await fs.rename(path, newPath);

    const { token } = req.cookies;

    jwt.verify(token, secret, async (err, info) => {
      if (err) throw err;

      const { title, summary, content } = req.body;

      const newPost = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });

      res.json(newPost);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatingPost = async (req, res) => {
 

  // Respond with the updated post data
  // res.json({ reult: 4, fileis: req.file })
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    newPath = `${path}.${extension}`;
    await fs.rename(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, secret, async (err, info) => {
    if (err) throw err;
    
    const {id,title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    // res.json({ idAuthors: isAuthor });
    if (!isAuthor) {
      return res.status(400).json('You are not the author');
      
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath?newPath:postDoc.cover,
    })

    res.json(postDoc);
  });
  
};

module.exports = { creatingPost, updatingPost };
