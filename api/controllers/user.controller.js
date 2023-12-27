//importing schema to create user object
const User = require("../models/user.model");
const bycrypt = require("bcryptjs");

const salt = bycrypt.genSaltSync(10);

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await User.create({
      username,
      password: bycrypt.hashSync(password, salt),
    });
    res.status(200).json({
      success: true,
      data: response,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something wrong in registration",
    });
  }
};
module.exports = createUser;
