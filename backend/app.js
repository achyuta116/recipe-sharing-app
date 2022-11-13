const express = require('express')
const authRoutes = require('./routes/authRoutes')
const recipeRoutes = require('./routes/recipeRoutes')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
app.use('/api/recipe', recipeRoutes)

app.listen(8000, () => {
    console.log("Express server started")
})
