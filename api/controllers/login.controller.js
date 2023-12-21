const User = require("../models/user.model");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "lkdjfah807jdlfk89hjkdsjfb";


const login = async (req, res) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(bycrypt.compareSync(password, user.password));
    if (user) {
      if (bycrypt.compareSync(password, user.password)) {
        //login
        jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json("user Login");
          
        })
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something wrong in login attempt",
    });
  }
};

module.exports = login;
