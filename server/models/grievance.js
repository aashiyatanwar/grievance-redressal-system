const { Sequelize, DataTypes } = require('sequelize');
const User = require("./user")
const Faculty = require("./faculty")

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',      // Specify the database dialect
  host: 'localhost',     // Database host
  username: 'aashiya', // Database username
  password: 'aashiya123!', // Database password
  database: 'grievance_management', // Database name
});

// Define the Grievance model
const Grievance = sequelize.define('Grievance', {
  detail: {
    type: DataTypes.STRING,
  },
  dateOfSubmission: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  remarks: {
    type: DataTypes.STRING,
  },
  dateOfRedressal: {
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER, // Assuming 'userId' corresponds to the primary key of the 'user' table
    references: {
      model: 'User',       // Referencing the 'Users' table
      key: 'id',            // Assuming 'id' is the primary key of the 'Users' table
    },
  },
  facultyId: {
    type: DataTypes.INTEGER, // Assuming 'facultyId' corresponds to the primary key of the 'faculty' table
    references: {
      model: 'Faculty',   // Referencing the 'Faculties' table
      key: 'id',            // Assuming 'id' is the primary key of the 'Faculties' table
    },
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Resolved'),
    defaultValue: 'Pending',
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Canteen', 'Departmental', 'Sports', 'Head-Faculty', 'Other']],
    },
  },
});

Grievance.belongsTo(User, { foreignKey: 'userId',  as: 'user' });
Grievance.belongsTo(Faculty, { foreignKey: 'facultyId', as: 'faculty' });


// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync(); // This will create the Grievance table if it doesn't exist
    console.log('Grievance table synced successfully.');
  } catch (error) {
    console.error('Error syncing Grievance table:', error);
  }
})();

// Export the Grievance model
module.exports = Grievance;

