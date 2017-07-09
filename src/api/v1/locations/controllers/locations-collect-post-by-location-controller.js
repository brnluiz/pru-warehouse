const fs = require('fs')

const locationService = require('../location-service')

const workerPath = (id) => `../workers/collect/${id}`

const locationCollectPostByLocationController = async (req, res, next) => {
  const locationId = req.params.locationId

  let location
  try {
    location = await locationService.get(locationId)
  } catch (err) {
    throw new Error(`Location ${locationId} does not exist`)
  }

  if (!fs.existsSync(workerPath(location.slug))) {
    throw new Error(`Worker for ${location} does not exist`)
  }

  try {
    await require(workerPath(location))(location)
  } catch (err) {
    throw new Error(`Error on ${location} worker`, err)
  }

  res.sendStatus(201)
  next()
}

module.exports = locationCollectPostByLocationController
