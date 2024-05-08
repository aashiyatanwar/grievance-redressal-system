// const User = require("../models/user");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// module.exports.userVerification = (req, res) => {
//   const token = req.cookies.token
//   console.log("token-st" , token)
//   if (!token) {
//     return res.json({ status: false })
//   }
//   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//     if (err) {
//      return res.json({ status: false })
//     } else {
//       const user = await User.findById(data.id)
//       if (user) return res.json({ status: true, user: user })
//       else return res.json({ status: false })
//     }
//   })
// }

const mysql = require("mysql");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Verify user using token from cookies
module.exports.userVerification = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false, message: "Token not provided" });
  }

  try {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      console.log("data", data);
      if (err) {
        return res.json({ status: false });
      } else {
        const user = await User.findByPk(data.id);
        if (user) return res.json({ status: true, user: user });
        else return res.json({ status: false });
      }
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res
      .status(500)
      .json({ status: false, message: "Token verification failed" });
  }
};
