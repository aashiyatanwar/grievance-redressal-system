const { Signup, Login } = require('../controllers/authCtrl')
const {userVerification} = require( "../middleware/authMiddleware")

const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/verify',userVerification)

module.exports = router