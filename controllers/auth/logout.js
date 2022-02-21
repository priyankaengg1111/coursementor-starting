'use strict';
const User = require("../../models/userModel");

module.exports.logoutController = async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);

    if (!user) {
      return res.status(201).json({ message: "User not found" });
    }

    user.authToken = user.authToken.filter(token => token !== req.body.token);

    await user.save();
    return res.status(200).json({ message: "Done", user });
  } catch {
    res.status(500).json({ message: "Unable to logout" });
  }
};
