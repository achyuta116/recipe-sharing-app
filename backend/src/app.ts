import express from 'express'
import authRoutes from './routes/authRoutes'
import recipeRoutes from './routes/recipeRoutes'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
app.use('/api/recipe', recipeRoutes)

app.listen(8000, () => {
    console.log("Express server started")
    console.log("Have a good day")
})
