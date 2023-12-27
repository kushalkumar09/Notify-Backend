const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


// importing building logic
const createUser = require('../controllers/user.controller.js');
const { login, logout, profile } = require('../controllers/login.controller.js');
const creatingPost = require("../controllers/post.controller.js");

//defining routes
router.post('/register', createUser);
router.post('/login', login);
router.get('/profile', profile);
router.post('/logout', logout);
router.post('/post', upload.single('file'),creatingPost)

module.exports = router;
