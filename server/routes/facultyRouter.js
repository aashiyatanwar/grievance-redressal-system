const { Signup, Login } = require('../controllers/facultyCtrl')
const {userVerification} = require( "../middleware/facultyMiddleware")

const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/',userVerification)

module.exports = router