require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (userId) => {
  return jwt.sign({ id : userId }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

module.exports.createSecretTokenFac = (facultyId) => {
  return jwt.sign({ id : facultyId}, process.env.TOKEN_KEY_FAC, {
    expiresIn: 3 * 24 * 60,
  });
};