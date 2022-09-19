require("dotenv").config();
const jwt = require("jsonwebtoken");
const { BadRequest } = require('../errors');

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequest("Please provide email and password");
  }
  //just for demo, normally provided by DB
  const id = new Date().getDate();

  //try to keep payload small, better experience for users
  const token = jwt.sign(
    {
      username,
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  res.status(200).json({ msg: "Successful", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
