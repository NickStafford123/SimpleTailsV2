const express = require('express')
const router = express.Router()
const upload = require('../config/multer.config')
const isAuthenticated = require('../config/jwt.config')
const drinkController = require('../controllers/drink.controller')

router.post('/add', upload, isAuthenticated, drinkController.addDrink)

router.get('/allUsersDrinks', isAuthenticated, drinkController.getUsersDrinks)

router.get('/allDrinks', drinkController.getAllDrinks)

router.get('/:id', isAuthenticated, drinkController.getDrinksById)

router.delete('/:id', isAuthenticated, drinkController.deleteDrinkById)

router.put('/:id', upload, isAuthenticated, drinkController.updateDrinkById) 

module.exports = router