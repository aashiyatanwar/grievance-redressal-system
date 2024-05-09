const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',      // Specify the database dialect
  host: 'localhost',     // Database host
  username: 'aashiya', // Database username
  password: 'aashiya123!', // Database password
  database: 'grievance_management', // Database name
});

// Define the Admin model
const Admin = sequelize.define('Admin', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync(); // This will create the Admin table if it doesn't exist
    console.log('Admin table synced successfully.');
  } catch (error) {
    console.error('Error syncing Admin table:', error);
  }
})();

// Export the Admin model
module.exports = Admin;




