const mysql = require("mysql");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Faculty = require("../models/faculty");

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
  const token_fac = req.cookies.token_fac;

  if (!token_fac) {
    return res.json({ status: false, message: "Token not provided" });
  }

  try {
    jwt.verify(token_fac, process.env.TOKEN_KEY_FAC, async (err, data) => {
      console.log("data", data);
      if (err) {
        return res.json({ status: false });
      } else {
        const faculty = await Faculty.findByPk(data.id);
        if (faculty) return res.json({ status: true, faculty: faculty });
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
