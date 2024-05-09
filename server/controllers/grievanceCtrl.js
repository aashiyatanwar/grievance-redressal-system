const Grievance = require('../models/grievance');
const User = require('../models/user')
const Faculty = require('../models/faculty')

// Create a new grievance
module.exports.createGrievanceByUser = async (req, res) => {
  try {
    const { detail, department } = req.body;
    const { userId } = req.params;
    console.log("grievance" , detail , department, userId)

    const newGrievance = await Grievance.create({ detail, department, userId });
    console.log("newGrievance" , newGrievance)

    res.status(201).json({ message: 'Grievance created successfully', grievance: newGrievance });

    
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Create a new grievance redressal status
module.exports.createGrievanceRedressalStatus = async (req, res) => {
  try {
    const { remarks, status, grievanceId } = req.body;

    const updatedGrievance = await Grievance.update(
      { remarks, status },
      { where: { id: grievanceId } }
    );

    res.status(200).json({ message: 'Grievance redressal status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all grievance redressal statuses
module.exports.getAllGrievanceRedressalStatuses = async (req, res) => {
  try {
    const options = {
      order: [['createdAt', 'ASC']],
      // Additional options can be added for filtering or pagination
    };

    const statuses = await Grievance.findAll(options);

    if (statuses.length > 0) {
      res.status(200).json({ success: true, data: statuses });
    } else {
      res.status(200).json({ success: true, msg: 'No Data Found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single grievance redressal status by ID
module.exports.getGrievanceRedressalStatusById = async (req, res) => {
  try {
    const { id } = req.params;

    const status = await Grievance.findByPk(id);

    if (!status) {
      return res.status(404).json({ message: 'Grievance redressal status not found' });
    }

    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a grievance redressal status

module.exports.updateGrievanceRedressalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks, dateOfRedressal, status } = req.body;

    console.log(id , remarks)

    const existingGrievance = await Grievance.findByPk(id);

    if (!existingGrievance) {
      return res.status(404).json({ message: 'Grievance redressal status not found' });
    }

    // Update the existing grievance with new values
    existingGrievance.remarks = remarks;
    existingGrievance.dateOfRedressal = dateOfRedressal;
    existingGrievance.status = status;

    // Save the updated grievance
    await existingGrievance.save();

    // Send the updated grievance data back to the client
    res.status(200).json({ message: 'Grievance redressal status updated successfully', grievance: existingGrievance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a grievance redressal status
exports.deleteGrievanceRedressalStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStatus = await Grievance.destroy({ where: { id } });

    if (!deletedStatus) {
      return res.status(404).json({ message: 'Grievance redressal status not found' });
    }

    res.status(200).json({ message: 'Grievance redressal status deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all grievance redressal statuses with filtering by date range
module.exports.getAllGrievanceRedressalStatusesbyDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const statuses = await Grievance.findAll({
      where: {
        dateOfSubmission: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      },
      order: [['createdAt', 'ASC']],
    });

    if (statuses.length > 0) {
      res.status(200).json({ success: true, data: statuses });
    } else {
      res.status(200).json({ success: true, msg: 'No Data Found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getGrievanceRedressalStatusByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userID" , userId)

    // Find all grievance statuses where the user ID matches
    const statuses = await Grievance.findAll({
      where: { userId : userId },
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