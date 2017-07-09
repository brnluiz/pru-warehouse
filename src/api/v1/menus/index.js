const router = require('express').Router()

const getByLocationController = require('./controllers/menus-get-by-location-controller')
const getController = require('./controllers/menus-get-controller')

// TODO: returns the menu for a specific location
router.get('/locations/:locationSlug/menus', getByLocationController)

router.get('/menus/:menuId', getController)

module.exports = router
