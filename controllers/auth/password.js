'use strict';
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const {
  ACCESS_TOKEN: ACCESS_TOKEN
} = require('../../core/config');
const jwt = require("jsonwebtoken");


/**
 * @desc forgot password
 * @router api/auth/forgot
 * @access Public
 */
module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(422);
    throw Error(`Account with this email doesn't exists`);
  }

  // sendEmail(email, url, "Reset your password");
  res.json({ message: "Password reset link send, please check your email." });
};

/**
 * @desc reset password
 * @router api/auth/reset
 * @access Public
 */
module.exports.resetPassword = async (req, res) => {
  const { password, access_token } = req.body;

  const passwordHash = await bcrypt.hash(password, 12);
  const decodedToken = jwt.verify(access_token, ACCESS_TOKEN.secret);
  await User.findOneAndUpdate(
    { _id: decodedToken.id },
    {
      password: passwordHash,
    }
  );

  res.json({success : true, message: "Password successfully changed!" });
};
/**
 * @method GET
 **/

module.exports.passwordResetPage = (req, res) => {
  const { token } = req.params;
  try {
    jwt.verify(token, ACCESS_TOKEN.secret);
  } catch {
    return res.send("Link has been expired");
  }
  res.send(token);
};
