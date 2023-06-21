const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).lean().exec();

  if (!user) {
    res.status(400).json({ message: "User Not found" });
  } else {
    res.status(200).json({
      id: user.id,
      addresses: user.addresses,
      email: user.email,
      role: user.role,
    });
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true })
    .lean()
    .exec();

  if (!user) {
    res.status(400).json({ message: "User Not found" });
  } else {
    res.status(200).json(user);
  }
});

module.exports = {
  getUserById,
  updateUserById,
};
