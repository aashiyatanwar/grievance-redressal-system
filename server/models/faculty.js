// const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');


// const facultySchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, "Your email address is required"],
//     unique: true,
//   },
//   name: {
//     type: String,
//     required: [true, "Your name is required"],
//     unique: true,
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

// facultySchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 12);
// });

// module.exports = mongoose.model("faculty", facultySchema);

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

// Define the Faculty model
const Faculty = sequelize.define('Faculty', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
    beforeCreate: async (faculty) => {
      faculty.password = await bcrypt.hash(faculty.password, 12);
    },
  },
});

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync(); // This will create the Faculty table if it doesn't exist
    console.log('Faculty table synced successfully.');
  } catch (error) {
    console.error('Error syncing Faculty table:', error);
  }
})();

// Export the Faculty model
module.exports = Faculty;

