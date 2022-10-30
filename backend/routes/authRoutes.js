const router = require('express').Router()
const authController = require('../controllers/authController')
const jwt = require('jsonwebtoken')

const createToken = (slug) => {
		return jwt.sign({_id: slug}, process.env.SECRET, {expiresIn: '3d'})
}



router.post('/login', (req, res) => {
		const { username, password } = req.body
		// Login user if exists, if user doesn't exist return error
		try {
				// login user
				const token = createToken('user.slug')
				res.status(200).json({ username, token})
		} catch (error) {
				res.status(400).json({error: error.message})	
		}
})

router.post('/signup', (req, res) => {
		const { username, password } = req.body
		// Signup user if doesnt exist, if user exists return error
		try {
				// signup user
				const token = createToken('user.slug')
				res.status(200).json({ username, token })
		} catch (error) {
				res.status(400).json({ error: error.message })
		}
})

module.exports = router 

