const Faculty = require("../models/faculty");
const { createSecretTokenFac } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, name, mobile, createdAt } = req.body;
    const existingUser = await Faculty.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const faculty = await Faculty.create({ email, password, name,mobile, createdAt });
    const token_fac = createSecretTokenFac(faculty._id);
    console.log("signu-fac: " ,token_fac)
    res.cookie("token_fac", token_fac, {
      withCredentials: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None'
    });
    console.log("cookie" , res.cookie)
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, faculty });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const faculty = await Faculty.findOne({ email });
      if(!faculty){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,faculty.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token_fac = createSecretTokenFac(faculty._id);
       console.log("login-token-fac" , token_fac)
       res.cookie("token_fac", token_fac, {
         withCredentials: true,
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'None'
       });
       console.log("cookie" , res.cookie)
       res.status(201).json({ message: "User logged in successfully", success: true });
       next()
    } catch (error) {
      console.error(error);
    }
  }