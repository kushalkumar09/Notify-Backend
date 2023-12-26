const User = require("../models/user.model");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "lkdjfah807jdlfk89hjkdsjfb";

const login = async (req, res) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // console.log(bycrypt.compareSync(password, user.password));
    if (user) {
      if (bycrypt.compareSync(password, user.password)) {
        //login
        jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            id: user._id,
            username,
          });
        });
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
const profile = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  // res.json(req.cookies);
};

//logout
const logout = (req, res) => {
  res.cookie("token", "").json("ok");
};
module.exports = { login, profile, logout };
