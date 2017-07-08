const log = require('../../../helpers/log')
const db = require('../../../db')

const tag = 'location-service'

const LocationService = {
  async create (locationIn) {
    try {
      return await db.location.create(locationIn)
    } catch (err) {
      log.error(`[${tag}] Error on location creation`, err)
      throw err
    }
  },
  async getAll () {
    try {
      return await db.location.findAll()
    } catch (err) {
      log.error(`[${tag}] Error on fetching locations`, err)
      throw err
    }
  },
  async get (id) {
    try {
      return await db.location.findOne(id)
    } catch (err) {
      log.error(`[${tag}] Error on fetching location by id`, err)
      throw err
    }
  }
}

module.exports = LocationService
