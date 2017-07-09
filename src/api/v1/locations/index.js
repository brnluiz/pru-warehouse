const router = require('express').Router()

const collectPostController = require('./controllers/locations-collect-post-controller')
const collectPostByLocationController = require('./controllers/locations-collect-post-by-location-controller')

// TODO: queue the collection process of all enabled locations
router.post('/collect', collectPostController)

// TODO: start the collection process for the specified location
router.post('/collect/:location', collectPostByLocationController)

module.exports = router
