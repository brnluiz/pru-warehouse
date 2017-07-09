const eventService = require('../../../../event-service')
const locationService = require('../location-service')

const locationCollectPostController = async (req, res, next) => {
  // Will be executed async
  const locations = await locationService.getAll()

  locations.forEach((location) =>
    eventService.emit('location.collect', location))

  res.sendStatus(201)
  next()
}

module.exports = locationCollectPostController
