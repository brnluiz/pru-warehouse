const router = require('express').Router()

const getByLocationController = require('./controllers/menus-get-by-location-controller')

// TODO: returns the menu for a specific location
router.get('/locations/:locationId/menus', getByLocationController)

module.exports = router
