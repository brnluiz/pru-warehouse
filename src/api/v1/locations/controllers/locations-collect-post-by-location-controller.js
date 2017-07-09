const locationService = require('../location-service')

const workerPath = (id) => `../workers/collect/${id}`

const locationCollectPostByLocationController = async (req, res, next) => {
  const locationSlug = req.params.locationSlug

  let location
  try {
    location = await locationService.get(locationSlug)
  } catch (err) {
    throw new Error(`Location ${locationSlug} does not exist`)
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
