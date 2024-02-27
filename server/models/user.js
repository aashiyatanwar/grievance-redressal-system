const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  enrollment_no: {
    type: String,
    required: [true, "Your emrollment no. is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Your name is required"],
    unique: true,
  },
  fathers_name: {
    type: String,
    required: [true, "Your father's name is required"],
  },
  mothers_name: {
    type: String,
    required: [true, "Your mother's name is required"],
  },
  mobile: {
    type: String,
    required: [true, "Your mobile is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("user", userSchema);
