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
      throw error.Generic('Error on location creation', err)
    }
  },
  async getAll () {
    let locations
    try {
      locations = await db.location.findAll()
    } catch (err) {
      throw error.Generic('Error on fetching locations', err)
    }
    if (locations.length) return locations

    throw error.NotFound('Locations not found')
  },
  async get (slug) {
    let location
    try {
      location = await db.location.findOne({
        where: { slug }
      })
    } catch (err) {
      throw error.Generic('Error on fetching location by id', err)
    }

    if (location) return location

    throw error.NotFound('Location not found')
  }
}

module.exports = LocationService
