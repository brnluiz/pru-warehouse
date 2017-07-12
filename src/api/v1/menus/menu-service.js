const db = require('../../../db')
const error = require('../../../errors')
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

  throw new error.GenericError('Error on creating menu', err)
}

const MenuService = {
  async get (id) {
    let menu
    try {
      menu = await db.menu.findById(id)
    } catch (err) {
      throw new error.GenericError('Error on fetching menus', err)
    }

    if (menu) return menu

    throw new error.NotFoundError('Menu not found')
  },
  async getByLocation (locationSlug, startDate, endDate) {
    let location
    try {
      location = await locationService.get(locationSlug)
    } catch (err) {
      if (err instanceof error.NotFoundError) throw err
      else throw new error.GenericError('Error on fetching menus', err)
    }

    try {
      const conditions = { locationId: location.id }
      if (startDate && endDate) conditions.date = { $bt: [startDate, endDate] }

      return db.menu.findAll({ where: conditions })
    } catch (err) {
      throw new error.GenericError('Error on fetching menus', err)
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
