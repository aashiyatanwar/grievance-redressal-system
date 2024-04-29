const Faculty = require("../models/faculty");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token_fac = req.cookies.token_fac
  console.log("token-fac" , token_fac)
  if (!token_fac) {
    return res.json({ status: false })
  }
  jwt.verify(token_fac, process.env.TOKEN_KEY_FAC, async (err, data) => {
      console.log("token" , token_fac)
      console.log("data" , data)
    if (err) {
     return res.json({ status: false })
    } else {
      const faculty = await Faculty.findById(data.id)
      if (faculty) return res.json({ status: true, faculty: faculty })
      else return res.json({ status: false })
    }
  })
}