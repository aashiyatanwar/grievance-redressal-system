// const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');


// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, "Your email address is required"],
//     unique: true,
//   },
//   enrollment_no: {
//     type: String,
//     required: [true, "Your emrollment no. is required"],
//     unique: true,
//   },
//   name: {
//     type: String,
//     required: [true, "Your name is required"],
//     unique: true,
//   },
//   fathers_name: {
//     type: String,
//     required: [true, "Your father's name is required"],
//   },
//   mothers_name: {
//     type: String,
//     required: [true, "Your mother's name is required"],
//   },
//   mobile: {
//     type: String,
//     required: [true, "Your mobile is required"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Your password is required"],
//   },

//   createdAt: {
//     type: Date,
//     default: new Date(),
//   },
// });

// userSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 12);
// });

// module.exports = mongoose.model("user", userSchema);

const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',      // Specify the database dialect
  host: 'localhost',     // Database host
  username: 'aashiya', // Database username
  password: 'aashiya123!', // Database password
  database: 'grievance_management', // Database name
});

// Define the User model
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  enrollment_no: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fathers_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mothers_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 12);
    },
  },
});

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync(); // This will create the User table if it doesn't exist
    console.log('User table synced successfully.');
  } catch (error) {
    console.error('Error syncing User table:', error);
  }
})();

// Export the User model
module.exports = User;

