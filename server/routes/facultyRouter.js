const { Signup, Login , createGrievanceByFaculty , getGrievanceRedressalStatusByFaculty} = require('../controllers/facultyCtrl')
const {userVerification} = require( "../middleware/facultyMiddleware")

const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/',userVerification)
router.post('/postGrievanceFaculty/:facultyId', createGrievanceByFaculty)
router.get("/faculty/:facultyId", getGrievanceRedressalStatusByFaculty);

module.exports = router