const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  console.log(user, "blue");
  const doc = await user.save();

  if (doc) {
    res.status(201).json(doc);
  } else {
    res.status(404).json({ message: "something went wrong" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).json({ message: "user Not found" });
  }

  if (user.password === req.body.password) {
    res.status(200).json({ id: user.id, email: user.email });
  } else {
    res.status(409).json({ message: "Invalid credentials" });
  }
});

module.exports = {
  createUser,
  loginUser,
};
