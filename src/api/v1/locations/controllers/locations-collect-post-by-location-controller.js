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

  try {
    const worker = await require(workerPath(location.slug))
    await worker.run(location)
  } catch (err) {
    throw new Error(err, `Error on ${location.slug} worker`)
  }

  res.sendStatus(201)
  next()
}

module.exports = locationCollectPostByLocationController
