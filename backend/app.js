const express = require('express')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRoutes)

app.listen(8000, () => {
		console.log("Express server started")
})
