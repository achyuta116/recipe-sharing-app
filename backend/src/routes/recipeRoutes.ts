const router = require('express').Router()
const recipeController = require('../controllers/recipeController')
const requireAuth = require('../middleware/requireAuth')

router.get('/ingredients', recipeController.recipes_ingredients_get)

router.get('/', recipeController.recipes_filter_recipes_get)

router.get('/recipe', recipeController.recipes_all_get)

router.get('/:user/:rname', recipeController.recipes_single_get)

router.use(requireAuth)

router.delete('/recipe', recipeController.recipes_single_delete)

router.post('/recipe', recipeController.recipes_single_post)

router.put('/recipe', recipeController.recipes_single_update)

export default router
