// routes/auth.js
const db = require("../models/index");
const CustomError = require("../helpers/customError");

const bcrypt = require("bcryptjs");
const User = db.userModel;
const jwtUtils = require("../helpers/jwt");

exports.registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      throw new CustomError(400, "Please Provide a email address!");
    }

    if (!password) {
      throw new CustomError(400, "Please Provide a password!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      throw new CustomError(400, "Please Provide a email address!");
    }

    if (!password) {
      throw new CustomError(400, "Please Provide a password!");
    }

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new CustomError(401, "Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError(401, "Invalid username or password");
    }

    const token = jwtUtils.generateToken({
      id: user.id,
      username: user.username,
    });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
