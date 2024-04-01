const grievance = require("../models/grievance");

module.exports.Grievance = async (req, res, next) => {
  const filter = { _id: req.params.userId };
  console.log(filter);

  try {
    const newPost = grievance({
      detail: req.body.detail,
      department: req.body.department,

      user: filter,
    });

    const savedPost = await newPost.save();
    res.status(200).send({ grievance: savedPost });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Create a new grievance redressal status
module.exports.createGrievanceRedressalStatus = async (req, res) => {
  const filter = { _id: req.params.grievanceId };
  console.log(grievanceId);
  try {
    const newPost = grievance({
      remarks: req.body.remarks,
      status: req.body.status,
      grievance: filter,
    });
    const savedStatus = await newStatus.save();
    res.send(201).json(savedStatus);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get all grievance redressal statuses
module.exports.getAllGrievanceRedressalStatuses = async (req, res) => {
  try {
    const options = {
      // sort returned documents in ascending order
      sort: { createdAt: 1 },
      // Include only the following
      // projection : {}
    };

    const statuses = await grievance.find(options);
    console.log("statues-all", statuses);
    if (statuses) {
      res.status(200).send({ success: true, data: statuses });
    } else {
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single grievance redressal status by ID
module.exports.getGrievanceRedressalStatusById = async (req, res) => {
  try {
    const status = await grievance.findById(req.params.id);
    if (!status) {
      return res
        .status(404)
        .send({ message: "Grievance redressal status not found" });
    }
    res.json(status);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a grievance redressal status
module.exports.updateGrievanceRedressalStatus = async (req, res) => {
  try {
    const { remarks, dateOfRedressal, status } = req.body;
    const updatedStatus = await grievance.findByIdAndUpdate(
      req.params.id,
      { remarks, dateOfRedressal, status },
      { new: true }
    );
    if (!updatedStatus) {
      return res
        .status(404)
        .send({ message: "Grievance redressal status not found" });
    }
    res.json(updatedStatus);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a grievance redressal status
module.exports.deleteGrievanceRedressalStatus = async (req, res) => {
  try {
    const deletedStatus = await grievance.findByIdAndDelete(req.params.id);
    if (!deletedStatus) {
      return res
        .status(404)
        .send({ message: "Grievance redressal status not found" });
    }
    res.json({ message: "Grievance redressal status deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.getGrievanceRedressalStatusByUser = async (req, res) => {
  try {
    //const userId = req.params.userId;
    const filter = { user: req.params.userId };
    console.log(filter);
    const statuses = await grievance.find(filter);
    console.log("Statuses:", statuses);
    res.send(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Backend code

// Get all grievance redressal statuses with filtering by date range
module.exports.getAllGrievanceRedressalStatusesbyDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};

    // If start date is provided, add it to the query
    if (startDate) {
      query.dateOfSubmission = { $gte: new Date(startDate) };
    }

    // If end date is provided, add it to the query
    if (endDate) {
      query.dateOfSubmission = {
        ...query.dateOfSubmission,
        $lte: new Date(endDate),
      };
    }

    const statuses = await grievance.find(query);
    res.send(statuses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
