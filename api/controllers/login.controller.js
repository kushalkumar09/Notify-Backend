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
const profile = async (req, res) => {
  try {
    const { token } = req.cookies;
    const info = await jwt.verify(token, secret, {});
    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};


//logout
const logout = async(req, res) => {
  res.cookie("token", "").json("ok");
};
module.exports = { login, profile, logout };
