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
						const list = query.ingredients.join(',')
						where.push(
`(uid, rname) in (SELECT DISTINCT uid, rname FROM RECIPE_USES_INGREDIENT WHERE iname IN (${list}))`)
				}

				const whereString = where.join(' AND ')
				console.log(whereString)


				const query = 'SELECT * FROM RECIPES ' + where? ('WHERE ' + where) : ''

				const { rows } = await pool.query(query)
				res.status(200).json({ recipes: rows })
		} catch (error) {
				res.status(400).json({ error: error.message })
		}
})
