const router = require('express').Router()
const authController = require('../controllers/authController')


router.post('/login', authController.user_login_post)

router.post('/signup', authController.user_signup_post)

module.exports = router 

