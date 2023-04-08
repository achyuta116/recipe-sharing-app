import jwt from 'jsonwebtoken'
import { Pool } from 'pg'
const pool = new Pool()

const requireAuth = async (req, res, next) => {
    // verify user is authenticated
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET) as any

        const sqlQuery = 'SELECT * FROM USERS WHERE slug=$1'
        const { rows } = await pool.query(sqlQuery, [_id])
        console.log(rows)
        if (rows.length === 1){
            req.slug = _id
            next()
        }
        else throw Error('Not authorized')
    } catch (error) {
        console.log(error.message)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth
