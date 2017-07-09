const router = require('express').Router()

const collectPostController = require('./controllers/locations-collect-post-controller')
const collectPostByLocationController = require('./controllers/locations-collect-post-by-location-controller')

// TODO: queue the collection process of all enabled locations
router.post('/locations/collect', collectPostController)

// TODO: start the collection process for the specified location
router.post('/locations/:locationSlug/collect', collectPostByLocationController)

module.exports = router
