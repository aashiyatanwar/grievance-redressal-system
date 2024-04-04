const {
  Grievance,
  createGrievanceRedressalStatus,
  getAllGrievanceRedressalStatuses,
  getAllGrievanceRedressalStatusesbyDate,
  getGrievanceRedressalStatusById,
  updateGrievanceRedressalStatus,
  deleteGrievanceRedressalStatus,
  getGrievanceRedressalStatusByUser,
} = require("../controllers/grievanceCtrl");

const router = require("express").Router();
router.post("/postGrievance/:userId", Grievance);
router.post("/postStatus/:grievanceId", createGrievanceRedressalStatus);

// Get all grievance redressal statuses
router.get("/getAll", getAllGrievanceRedressalStatuses);

// Get a single grievance redressal status by ID
router.get("/get/:id", getGrievanceRedressalStatusById);

// Update a grievance redressal status
router.put("/update/:id", updateGrievanceRedressalStatus);

// Delete a grievance redressal status
router.delete("/delete/:id", deleteGrievanceRedressalStatus);
router.get("/user/:userId", getGrievanceRedressalStatusByUser);
router.get("/getByDate", getAllGrievanceRedressalStatusesbyDate);

module.exports = router;
