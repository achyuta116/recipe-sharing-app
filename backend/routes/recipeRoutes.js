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

router.get('/', async (req, res) => {
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


				const sqlQuery = 'SELECT * FROM RECIPE ' + where? ('WHERE ' + where) : ''

				const { rows } = await pool.query(sqlQuery)
				res.status(200).json({ recipes: rows })
		} catch (error) {
				res.status(400).json({ error: error.message })
		}
})

router.get('/recipe', async (req, res) => {
	try {
		const sqlQuery = 'SELECT * FROM RECIPE'
		const { rows } = await pool.query(sqlQuery)
		res.status(200).json({ rows })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

router.get('/:user/:rname', async (req, res) => {
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
		pool.query(sqlQuery)
		res.sendStatus(200)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

router.post('/create', async (req, res) => {
	const { rname, cuisine, course, cookTime, prepTime, instructions, imageUrl } = req.body

	try {
		const token = req.cookies.jwt
		const decoded = await jwt.verify(token, process.env.SECRET)
		const sqlQuery = `INSERT INTO RECIPE(rname, uid, cuisine, image_url, course, cook_time, prep_time, instructions, date) 
		VALUES($1, $2, $3, $4,
		$5, $6, $7, $8, $9)`
		const { rows } = pool.query(sqlQuery, 
			[rname, token._id, cuisine, imageUrl, course, cookTime, prepTime, instructions, (new Date().toISOString().slice(0, 10))])
		res.status(200).json({ recipe: rows[0] })
	} catch (error) {
		res.json({ error: error.message })
	}

})

router.put('/update', async (req, res) => {
	const { rname, cuisine, course, cookTime, prepTime, instructions, imageUrl } = req.body

	try {
		const token = req.cookies.jwt
		const decoded = await jwt.verify(token, process.env.SECRET)
		const sqlQuery = `UPDATE RECIPE SET cuisine=$1, image_url=$2, course=$3, cook_time=$4,
		prep_time=$5, instructions=$6, date=$7) WHERE rname=$8 AND uid=$9`
		const { rows } = pool.query(sqlQuery, 
			[cuisine, imageUrl, course, cookTime, prepTime, instructions, (new Date().toISOString().slice(0, 10)), rname, decoded._id])
		res.status(200).json({ recipe: rows[0] })
	} catch (error) {
		res.json({ error: error.message })
	}
})
