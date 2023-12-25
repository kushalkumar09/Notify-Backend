const express = require('express');
const router = express.Router();

// importing building logic
const createUser = require('../controllers/user.controller.js');
const {login} = require('../controllers/login.controller.js');
const { profile } = require('../controllers/login.controller.js');
//defining routes
router.post('/register', createUser);
router.post('/login', login);
router.get('/profile', profile);

module.exports = router;
