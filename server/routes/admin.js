const router = require('express').Router()
const {login} = require("../controllers/adminCtrl")
//const {updateGrievanceRedressalStatus} = require('../controllers/grievanceCtrl')

router.post("/login" , login)
//router.put("/grievance/update/:id", updateGrievanceRedressalStatus);

module.exports = router