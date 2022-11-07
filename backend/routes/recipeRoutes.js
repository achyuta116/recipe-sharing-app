const router = require('express').Router()
const recipeController = require('../controllers/recipeController')
const { Pool } = require('pg')

const pool = new Pool()

router.get('/ingredients', async (_req, res) => {
		try {
				const { rows: ingredients } = await pool.query('SELECT * FROM INGREDIENTS')
				res.status(200).json({ ingredients })
		} catch (error) {
				res.status(400).json({error: error.messsage})	
		}
})

router.get('/recipes', async (req, res) => {
		const query = new URLSearchParams(req.query)
		try {
				let where = []
				if (query.cuisine) where.push(`cuisine=${query.cuisine}`)
				if (query.course) where.push(`course=${query.course}`)
				if (query.maxCook) where.push(`maxCook<=${query.maxCook}`)
				if (query.minCook) where.push(`minCook>=${query.minCook}`)
				if (query.minPrep) where.push(`minPrep<=${query.minPrep}`)
				if (query.maxPrep) where.push(`minPrep>=${query.maxPrep}`)

				if (query.ingredients) {
						where.push(
						`(uid, rname) in (SELECT DISTINCT uid, rname FROM RECIPE_USES_INGREDIENT WHERE iname IN (${query.ingredients}))`)
				}

				const whereString = where.join(' AND ')
				console.log(whereString)


				const sqlQuery = 'SELECT * FROM RECIPES ' + where? ('WHERE ' + where) : ''

				const { rows } = await pool.query(sqlQuery)
				res.status(200).json({ recipes: rows })
		} catch (error) {
				res.status(400).json({ error: error.message })
		}
})

router.get('/recipe/:user/:rname', async (req, res) => {
	const { user, rname } = req.params
	try {
		const sqlQuery = `SELECT DISTINCT * FROM RECIPE WHERE uid=${user} AND rname=${rname}`
		const { rows } = await pool.query(sqlQuery)
		res.status(200).json({ recipe: rows[0] })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

router.delete('/recipe', async (req, res) => {
	const { user, rname } = req.body
	try {
		const sqlQuery = `DELETE FROM RECIPE WHERE uid=${user} AND rname=${rname}`
		const { rows } = await pool.query(sqlQuery)
		res.status(200)
	} catch (error) {
		
	}
})

router.post('/create', async (req, res) => {
	
})

router.put('/update', async (req, res) => {
	
})
