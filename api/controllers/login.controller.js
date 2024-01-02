const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "lkdjfah807jdlfk89hjkdsjfb";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = await jwt.sign({ username, id: user._id }, secret, {});
      res
        .cookie("token", token, { httpOnly: true })
        .json({ id: user._id, username });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong in the login attempt",
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

const logout = async (req, res) => {
  res.cookie("token", null, { httpOnly: true }).json("ok");
};

module.exports = { login, profile, logout };
