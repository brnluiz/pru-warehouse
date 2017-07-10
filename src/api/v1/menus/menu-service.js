const db = require('../../../db')
const eventService = require('../../../event-service')
const locationService = require('../locations/location-service')
const log = require('../../../../helpers/log')

const tag = 'menu-service'

const handleCreateException = (err) => {
  if (
    err instanceof db.Sequelize.ValidationError &&
    err.name === 'SequelizeUniqueConstraintError' &&
    (err.fields.locationId && err.fields.date)
  ) {
    log.info({ err }, `[${tag}] Menu creation was not allowed due to duplicated entries`)
    return
  }

  log.error({ err }, `[${tag}] Error on menu creation`)
  throw err
}

const MenuService = {
  async get (id) {
    try {
      return db.menu.findById(id)
    } catch (err) {
      log.error({ err }, `[${tag}] Error on fetching menus`)
      throw err
    }
  },
  async getByLocation (locationSlug, startDate, endDate) {
    try {
      const location = await locationService.get(locationSlug)

      return db.menu.findAll({
        where: { locationId: location.id }
      })
    } catch (err) {
      log.error({ err }, `[${tag}] Error on fetching menus`)
      throw err
    }
  },
  async create (menuIn) {
    try {
      const menu = await db.menu.create(menuIn)

      eventService.emit('menu.create', menu)
      log.info({ menu }, `[${tag}] Menu created`)

      return menu
    } catch (err) {
      handleCreateException(err)
    }
  },
  async createBulk (menusIn) {
    try {
      const menus = await db.menu.bulkCreate(menusIn, { validate: true })

      eventService.emit('menu.create', menus)
      log.info({ menus }, `[${tag}] Menus created`)

      return menus
    } catch (err) {
      handleCreateException(err)
    }
  }
}

module.exports = MenuService
