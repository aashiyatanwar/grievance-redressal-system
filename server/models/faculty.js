const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const facultySchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Your name is required"],
    unique: true,
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

facultySchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("faculty", facultySchema);
