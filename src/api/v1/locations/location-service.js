const db = require('../../../db')
const error = require('../../../errors')
const eventService = require('../../../event-service')

const LocationService = {
  async create (locationIn) {
    try {
      const location = await db.location.create(locationIn)
      eventService.emit('location.create', location)

      return location
    } catch (err) {
      throw new error.GenericError('Error on location creation', err)
    }
  },
  async getAll () {
    let locations
    try {
      locations = await db.location.findAll()
    } catch (err) {
      throw new error.GenericError('Error on fetching locations', err)
    }
    if (locations.length) return locations

    throw new error.NotFoundError('Locations not found')
  },
  async get (slug) {
    let location
    try {
      location = await db.location.findOne({
        where: { slug }
      })
    } catch (err) {
      throw new error.GenericError('Error on fetching location by id', err)
    }

    if (location) return location

    throw new error.NotFoundError('Location not found')
  }
}

module.exports = LocationService
