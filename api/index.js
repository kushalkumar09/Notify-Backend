const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("../api/db.js");
const Post = require("../api/models/post.model.js");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.ORIGIN || "http://localhost:3000";

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ORIGIN }));
app.use("/uploads", express.static(__dirname + "/uploads"));

// Database connection
dbConnect();

// Mount routes
app.use("/api/v1", require("./routes/route.js"));

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(30);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific post by ID
app.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
