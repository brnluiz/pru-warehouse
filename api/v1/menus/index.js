const router = require('express').Router()

const getByLocationController = require('./controllers/menus-get-by-location-controller')
const getByLocationAndDateController = require('./controllers/menus-get-by-location-and-date-controller')

// TODO: returns the menu for a specific location
router.get('/:location', getByLocationController)

// TODO: returns the menu for a specific location and date
router.get('/:location/:date', getByLocationAndDateController)

module.exports = router
