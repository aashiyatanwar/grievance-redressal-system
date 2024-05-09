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
      faculty.password // const mongoose = require("mongoose");

      // const grievanceSchema = new mongoose.Schema(
      //   {
      //     detail: { type: String },
      //     dateOfSubmission: { type: Date, default: Date.now },
      //     remarks: { type: String },
      //     dateOfRedressal: { type: Date },
      //     user: { type: mongoose.Types.ObjectId, ref: "user" },
      //     faculty: { type: mongoose.Types.ObjectId, ref: "faculty" },
      //     status: { type: String, enum: ["Pending", "Resolved"], default: "Pending" },
      //     department: {
      //       type: String,
      //       enum: ["Canteen", "Departmental", "Sports", "Head-Faculty", "Other"],
      //     },
      //   },
      //   {
      //     timestamps: true,
      //   }
      // );
      
      // module.exports = mongoose.model("grievance", grievanceSchema);= await bcrypt.hash(faculty.password, 12);
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

