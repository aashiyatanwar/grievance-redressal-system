const Faculty = require("../models/faculty");
const Grievance = require('../models/grievance')
const { createSecretTokenFac } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, name, mobile, createdAt } = req.body;
    const existingUser = await Faculty.findOne({ where: { email } });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const faculty = await Faculty.create({ email, password, name,mobile, createdAt });
    const token_fac = createSecretTokenFac(faculty.id);
    console.log("signu-fac: " ,token_fac)
    res.cookie("token_fac", token_fac, {
      withCredentials: true,
      httpOnly: false,
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
      const faculty = await Faculty.findOne({ where: { email } });
      if(!faculty){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,faculty.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token_fac = createSecretTokenFac(faculty.id);
       console.log("login-token-fac" , token_fac)
       res.cookie("token_fac", token_fac, {
         withCredentials: true,
         httpOnly: false,
       });
       console.log("cookie" , res.cookie)
       res.status(201).json({ message: "User logged in successfully", success: true });
       next()
    } catch (error) {
      console.error(error);
    }
  }

  module.exports.createGrievanceByFaculty = async (req, res) => {
    try {
      const { detail, department } = req.body;
      const { facultyId } = req.params;
      console.log("grievance" , detail , department, facultyId)
  
      const newGrievance = await Grievance.create({ detail, department, facultyId : facultyId });
      console.log("newGrievance" , newGrievance)
  
      res.status(201).json({ message: 'Grievance created successfully', grievance: newGrievance });
  
      
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  module.exports.getGrievanceRedressalStatusByFaculty = async (req, res) => {
    try {
      const { facultyId } = req.params;
      console.log("facultyID" , facultyId)
  
      // Find all grievance statuses where the user ID matches
      const statuses = await Grievance.findAll({
        where: { facultyId : facultyId },
      });
  
      console.log(statuses)
  
      if (statuses.length > 0) {
        res.status(200).json({ success: true, data: statuses });
      } else {
        res.status(200).json({ success: true, msg: 'No Data Found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };