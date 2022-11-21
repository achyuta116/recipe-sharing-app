const { Pool } = require('pg')
const slugify = require('slugify')

const pool = new Pool()

module.exports.recipes_ingredients_get = async (_req, res) => {
    try {
        const { rows: ingredients } = await pool.query('SELECT * FROM INGREDIENT')
        res.status(200).json({ ingredients: ingredients.map(el => el.iname) })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.messsage})	
    }
}

module.exports.recipes_filter_recipes_get = async (req, res) => {
    const query = req.query
    try {
        let where = []
        if (query.cuisine) where.push(`cuisine='${query.cuisine}'`)
        if (query.course) where.push(`course='${query.course}'`)
        if (query.maxCook) where.push(`cook_time<=${query.maxCook}`)
        if (query.minCook) where.push(`cook_time>=${query.minCook}`)
        if (query.minPrep) where.push(`prep_time<=${query.minPrep}`)
        if (query.maxPrep) where.push(`prep_time>=${query.maxPrep}`)

        if (query.ingredients) {
            const ingredientsList = query.ingredients.split(",").map(el => `'${el}'`)
            where.push(
                `(uid, rname) in (SELECT DISTINCT uid, rname FROM RECIPE_USES_INGREDIENT WHERE iname IN (${ingredientsList}))`)
        }

        const whereString = where.join(' AND ')

        const sqlQuery = 'SELECT course, cuisine, prep_time, cook_time, uname, uid, instructions, image_url, rname FROM RECIPE JOIN USERS ON uid=slug ' + (whereString ? ('WHERE ' + whereString) : '')
        const { rows } = await pool.query(sqlQuery)
        res.status(200).json({ recipes: rows })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

module.exports.recipes_all_get = async (req, res) => {
    try {
        const sqlQuery = 'SELECT course, cuisine, prep_time, cook_time, uname, uid, instructions, image_url, rname FROM RECIPE JOIN USERS ON uid=slug'
        const { rows } = await pool.query(sqlQuery)
        res.status(200).json({ recipes: rows })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

module.exports.recipes_single_get = async (req, res) => {
    const { user, rname } = req.params
    const uid = slugify(user, {
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: true
        })

    try {
        let sqlQuery = `SELECT DISTINCT * FROM RECIPE WHERE uid='${uid}' AND rname='${rname}'`
        const { rows: recipes } = await pool.query(sqlQuery)
        sqlQuery = 'SELECT DISTINCT * FROM RECIPE_USES_INGREDIENT WHERE rname=$1 AND uid=$2'
        const { rows: ingredients } = await pool.query(sqlQuery, [rname, uid])
        sqlQuery = 'SELECT DISTINCT uname FROM USERS WHERE slug=$1'
        const { rows: users } = await pool.query(sqlQuery, [uid])
        res.status(200).json({ recipe: recipes[0], ingredients, author: users[0].uname })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

module.exports.recipes_single_delete = async (req, res) => {
    const { rname } = req.body
    const uid = req.slug
    try {
        const sqlQuery = `DELETE FROM RECIPE WHERE uid='${uid}' AND rname='${rname}'`
        await pool.query(sqlQuery)
        res.sendStatus(200)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports.recipes_single_post = async (req, res) => {
    const { rname, cuisine, course, cookTime, prepTime, instructions, imageUrl, ingredients } = req.body

    try {
        const uid = req.slug
        const sqlQuery = `INSERT INTO RECIPE(rname, uid, cuisine, image_url, course, cook_time, prep_time, instructions) 
VALUES($1, $2, $3, $4,
$5, $6, $7, $8) RETURNING *`

        const { rows } = await pool.query(sqlQuery, 
            [rname, uid, cuisine, imageUrl, course, Number(cookTime), Number(prepTime), instructions])

        ingredients.forEach(async ingredient => {
            await pool.query('INSERT INTO RECIPE_USES_INGREDIENT(iname, amount, uid, rname) VALUES($1,$2,$3,$4)', [ingredient.ingredient, ingredient.amount, uid, rname])
        })
        console.log(rows)
        res.status(200).json({ recipe: rows[0] })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }

}

module.exports.recipes_single_update = async (req, res) => {
    const { rname, cuisine, course, cookTime, prepTime, instructions, imageUrl, ingredients } = req.body
    const uid = req.slug

    try {
        let sqlQuery = `UPDATE RECIPE SET cuisine=$1, image_url=$2, course=$3, cook_time=$4,
prep_time=$5, instructions=$6 WHERE rname=$7 AND uid=$8 RETURNING *`
        const { rows } = await pool.query(sqlQuery, 
            [cuisine, imageUrl, course, Number(cookTime), Number(prepTime), instructions, rname, uid])
        sqlQuery = 'DELETE FROM RECIPE_USES_INGREDIENT WHERE rname=$1'
        await pool.query(sqlQuery, [rname])
        ingredients.forEach(async ingredient => {
            await pool.query(
                'INSERT INTO RECIPE_USES_INGREDIENT(iname, amount, uid, rname) VALUES($1,$2,$3,$4)', [ingredient.ingredient, ingredient.amount, uid, rname])
        })
        res.status(200).json({ recipe: rows[0] })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

