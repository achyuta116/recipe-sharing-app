const router = require('express').Router()
const authController = require('../controllers/authController')
const { Pool } = require('pg')
const jwt = require('jsonwebtoken')
const slugify = require('slugify')

const pool = new Pool()

const maxAge = 3 * 24 * 60 * 60;
const createToken = (slug) => {
    return jwt.sign({_id: slug}, process.env.SECRET, {expiresIn: maxAge})
}

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    // Login user if exists, if user doesn't exist return error
    try {
        const slug = slugify(username, {
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: true
        })
        if (!slug) throw Error("Invalid Username")

        const { rows } = await pool.query('SELECT * FROM USERS WHERE slug=$1', [slug])
        if (rows.length === 0) throw Error("Username Not Found")
        const user = rows[0]
        if (user.pwd != password || user.uname != username) throw Error("Invalid Login or Password")
        const token = createToken(user.slug)
        res.status(200).json({ username: user.uname, token })
    } catch (error) {
        res.status(400).json({error: error.message})	
    }
})

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    // Signup user if doesnt exist, if user exists return error
    try {
        const slug = slugify(username, {
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: true
        })
        if (!slug) throw Error("Invalid Username")

        const { rows } = await pool.query('SELECT * FROM USERS WHERE slug=$1', [slug])
        if (rows.length) throw Error("Username Already Taken")
        const values = [username, password, slug]
        const user = await pool.query( 'INSERT INTO USERS(uname, pwd, slug) VALUES($1,$2,$3) RETURNING *', values) 
        if (!user) throw Error("Something went wrong during signup")
        const token = createToken(slug)
        res.status(200).json({ username, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router 

